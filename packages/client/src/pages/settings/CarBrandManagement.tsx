import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useQuery } from "react-query";
import { CarBrandResponse } from "../../app/models/car";
import DefaultPage from "../DefaultPage";
import agent from "../../app/api/agent";
import { RootStoreContext } from "../../app/stores/rootStore";
import BrandList from "./BrandList";

const CarBrandManagement = () => {
 // const { brandManagement } = useContext(RootStoreContext);
  useEffect(() => {
    //brandManagement.loadBrands();
  }, []);

  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        {/* {brandManagement.brandResponse?.isLoading ? (
          "Loading brands"
        ) : (
          <BrandList brands={brandManagement.brandResponse?.data?.data || []} />
        )} */}
      </div>
    </DefaultPage>
  );
};

export default observer(CarBrandManagement);
