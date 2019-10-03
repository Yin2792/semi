import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import NoDiscountProduct from './nodiscountproduct';
import DiscountProduct from './discountproduct';
import OrderedValue from './orderedvalue';
class History extends Component {
  render() {
    return (
      <div>
        <Router>
          <Tabs className="bg-dark" style={{ padding: 10 }}>
            <TabList>
              <Tab style={{ background: 'transparent' }}><Link to="/nodiscountproduct" style={{ color: '#d1d1d1' }}>Product List(with no discount)</Link></Tab>
              <Tab style={{ background: 'transparent' }}><Link to="/discountproduct" style={{ color: '#d1d1d1' }}>Product List(with discount)</Link></Tab>
              <Tab style={{ background: 'transparent' }}><Link to="/ordervalue" style={{ color: '#d1d1d1' }}>Odered Value</Link></Tab>
            </TabList>
            <TabPanel><NoDiscountProduct/></TabPanel>
            <TabPanel><DiscountProduct /></TabPanel>
            <TabPanel><OrderedValue/></TabPanel>
          </Tabs>
        </Router>
      </div>
    )
  }
}

export default History;