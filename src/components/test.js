import React, { Component } from 'react';

import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';


export default class Test  extends Component {

   scheduleObj= new ScheduleComponent({});
   dataManager = new DataManager({
    url: 'http://localhost:2600/compaign/GetData',
    crudUrl: 'http://localhost:2600/compaign/BatchData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
   render() {
    return (
      <div className="control-section">
        <div className="schedule-control">
          <ScheduleComponent id="schedule" ref={(schedule) => this.scheduleObj = schedule} height="550px"
            selectedDate={new Date(2017, 5, 5)} currentView="Month" eventSettings={{ }}>
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="Agenda" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    );
  }

}