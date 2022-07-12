import { Brand, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AUTH_CONFIGURATION } from '../src/auth/constants';

const prisma = new PrismaClient();

function generateDate(year: number, month: number, day: number) {
  const d = new Date();
  d.setFullYear(year);
  d.setUTCMonth(month);
  d.setUTCDate(day);
  return d;
}
async function getAdmin() {
  const admin = await prisma.user.findFirst({
    where: {
      email: 'admin@carcms.com',
    },
  });
  return admin;
}

async function getBrand(name: string) {
  return prisma.brand.findFirst({
    where: {
      name,
    },
  });
}

async function getBrandModel(brand: Brand, name: string) {
  return prisma.model.findFirst({
    where: {
      name,
    },
  });
}

async function getCompany(name: string) {
  return prisma.company.findFirst({
    where: {
      name,
    },
  });
}

async function getAccountingCode(code: string) {
  return prisma.codeForAccounting.findFirst({
    where: {
      code,
    },
  });
}

async function getCar(vinCode: string) {
  return prisma.car.findFirst({
    where: {
      vinCode,
    },
  });
}

async function seedAdmin() {
  console.log('Seeding Administrator');
  const birthdate = new Date();
  birthdate.setFullYear(1997);
  birthdate.setUTCMonth(10);
  birthdate.setUTCDate(17);
  const user = await getAdmin();
  const passwordHash = await bcrypt.hash(
    'admin',
    AUTH_CONFIGURATION.saltOrRounds,
  );
  console.log(passwordHash);
  if (user) {
    console.warn('Administrator already exists');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'admin',
      surname: 'admin',
      email: 'admin@carcms.com',
      birthdate: birthdate,
      hash: passwordHash,
      userRoleId: 1,
    },
  });
  console.warn('Administrator created');
}

async function seedBrands() {
  console.warn('Seeding brands');
  const admin = await getAdmin();

  const brands = await prisma.brand.findMany({
    where: {
      name: {
        in: ['BMW', 'Audi'],
      },
    },
  });
  const seedBrands = [
    {
      name: 'BMW',
      userId: admin.id,
    },
    {
      name: 'Audi',
      userId: admin.id,
    },
  ];

  const alreadyExistingBrands = brands.map((b) => b.name);
  const data = seedBrands.filter(
    (b) => !alreadyExistingBrands.includes(b.name),
  );
  await prisma.brand.createMany({ data });
  console.warn('Brands seeded');
}

async function seedModels() {
  console.log('Seeding brand models..');
  const admin = await getAdmin();
  const bmw = await getBrand('BMW');
  const audi = await getBrand('Audi');
  const existingModels = [
    await getBrandModel(bmw, '525i'),
    await getBrandModel(audi, 'A5'),
  ].filter((m) => m !== null);

  const bmwModels = [
    {
      name: '525i',
      userId: admin.id,
      brandId: bmw.id,
    },
  ];
  const audiModels = [
    {
      name: 'A5',
      userId: admin.id,
      brandId: audi.id,
    },
  ];
  let models = [...bmwModels, ...audiModels];
  for (const existingModel of existingModels) {
    const seedModel = models.find(
      (m) =>
        m.brandId === existingModel.brandId && existingModel.name === m.name,
    );
    models = models.filter((m) => m === seedModel);
  }

  await prisma.model.createMany({
    data: models,
  });
  console.log('Brand Model seeding finished...');
}

async function seedCompanies() {
  console.log('Seeding Companies');
  const company = await getCompany('Fibalter');
  const admin = await getAdmin();
  if (company) {
    return;
  }
  await prisma.company.create({
    data: {
      name: 'Fibalter',
      userId: admin.id,
    },
  });
  console.log('Companies Seeding Finished');
}

async function seedCodeForAccounting() {
  console.log('Seeding accounting codes');
  const codeForAccounting = await getAccountingCode('MP125');
  if (codeForAccounting) {
    return;
  }
  await prisma.codeForAccounting.create({
    data: {
      code: 'MP125',
    },
  });
  console.log('Code for accounting seeding finished');
}

async function seedCars() {
  console.log('seeding cars');
  const admin = await getAdmin();
  const company = await getCompany('Fibalter');
  const bmw = await getBrand('BMW');
  const bmw525i = await getBrandModel(bmw, '525i');

  const existingCars = [await getCar('ZXQQQQQQQQQQQQQQQQQQQ')].filter(
    (c) => c !== null,
  );

  const bmwCars = [
    {
      plateCode: 'XXQ:000',
      vinCode: 'ZXQQQQQQQQQQQQQQQQQQQ',
      userId: admin.id,
      companyId: company.id,
      modelId: bmw525i.id,
      year: 2004,
      acquiredDate: generateDate(2021, 11, 15),
      insuranceValidFrom: generateDate(2020, 1, 1),
      insuranceExpiresOn: generateDate(2023, 1, 1),
      technicalInspectionValidFrom: generateDate(2021, 5, 25),
      technicalInspectionExpiresOn: generateDate(2023, 5, 25),
    },
  ];

  let cars = [...bmwCars];
  for (const existingCar of existingCars) {
    const seedCar = cars.find((c) => c.vinCode === existingCar.vinCode);
    cars = cars.filter((c) => c !== seedCar);
  }
  await prisma.car.createMany({
    data: cars,
  });
  console.log('seeding cars finished');
}

async function main() {
  console.log('Seeding...');
  await seedAdmin();
  await seedBrands();
  await seedModels();
  await seedCompanies();
  await seedCodeForAccounting();
  await seedCars();
  console.log('Done...');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
