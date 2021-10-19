import { Page } from "@shopify/polaris";
import React from "react";
import Firstpage from "./components/firstpage";

class Index extends React.Component{  
  render () {
    return(
      <Page>
          <Firstpage></Firstpage>
      </Page>

    )
  }  
}
export default Index;
