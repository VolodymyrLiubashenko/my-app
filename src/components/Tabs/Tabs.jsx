import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const TabsItem = ({func1,func2,data,index})=>{
	return(
			<Tabs 	
				defaultIndex={index}
				onSelect= {(index,lastindex,event)=>{
	                if(index==1)
	                	return event = func2
	                if(index==0)
	                  	return event=func1
	          	}}
			>
            <TabList>
              <Tab>YourFeeds</Tab>
              <Tab>GlobalFeeds</Tab>
            </TabList>
            <TabPanel>
            	{data}
            </TabPanel>
            <TabPanel>
              {data}
            </TabPanel>
          </Tabs>
		)
		
}

export default TabsItem

