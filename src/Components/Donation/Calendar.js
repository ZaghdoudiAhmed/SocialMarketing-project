import React,{useEffect,useState} from 'react';
import { enableRipple } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';
import { ScheduleComponent,ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import axios from "axios";
const Calendar = () => {
    const[y,sety]=useState([]);
    var scheduleObj = new ScheduleComponent({});     
    var dataManager = new DataManager({
        url: 'http://localhost:2600/compaign/GetData',
        crudUrl: 'http://localhost:2600/compaign/BatchData',
        adaptor: new UrlAdaptor(),
        crossDomain: true ,
    });
    console.log(dataManager)
     /*const fetchdata=async()=>{
           const h =[]
           const response = await axios.get("http://localhost:2600/compaign/getcompaign"); 
               response.data.forEach(element => {
                 var x=  {
                       Subject:element.title,
                       StartTime: new Date(element.date_debut),
                       EndTime: new Date(element.date_fin),
                       Description: element.description,
                       IsAllDay: false,
                       Status: 'Completed',
                       Priority: 'High',
                       GroupColor: '#C2B2804',
                     }
                  h.push(x);
                   }); 
                 sety(h);
           }*/
   useEffect(() => {
       
    ///   fetchdata();

   },[])
    
 
    return (
        <div>
  <div className="stackblitz-container material" />

   <ScheduleComponent   width= '468px'  height='340px' ref={(schedule) => scheduleObj = schedule} currentView='WorkWeek' eventSettings={{ dataSource: dataManager}}>
                <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="Agenda" />
            </ViewsDirective>
   <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
  </ScheduleComponent>

</div>



    );
}

export default Calendar;
