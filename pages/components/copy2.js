import React, { Component } from 'react'
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Page } from "@shopify/polaris";

export class Firstpage extends Component {
    state = ({open:false})
    render() {
        return (
            <Page
  title = "Select Products"
  primaryAction ={{
    content : 'Select ',
    onAction : () => this.setState({open:true})
  }}
  >
    <ResourcePicker
      resourceType= 'Product'
      open={this.state.open}
      onCancel= {() => this.setState({open : false})}
      onSelection={(resources) => this.handleSelection(resources)}
      
    />  
  </Page>            
        )
    }
    handleSelection = (resources) =>{
        const idFromResources = resources.selection.map((product) => product.id);
        this.setState({open : false})
        console.log(idFromResources);
      }
}

export default Firstpage




//Index

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



import React from 'react';
import { Page, Layout, EmptyState} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from  './ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Firstpage extends React.Component {
  state = { open: false };
  render() {
    // A constant that defines your app's empty state
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? ( // Controls the layout of your app's empty state
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
          // Uses the new resource list that retrieves products by IDs
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}

export default Firstpage;


