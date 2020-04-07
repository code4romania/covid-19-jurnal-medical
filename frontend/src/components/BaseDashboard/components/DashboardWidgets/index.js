import DashboardWidget from "../DashboardWidget";
import React from "react";

const widget_1_data = [100, 200, 300, 200];
const widget_2_data = [100, 200, 300, 200, 145, 510];
const widget_3_data = [100, 200, 300, 200, 145, 160];

const DashboardWidgets = () => (
  <>
    <div className="mb-20">
      <strong>Date colectate</strong>
    </div>
    <div className="columns is-desktop">
      <div className="column is-one-third-desktop">
        <div className="dashboard-box is-paddingless">
          <DashboardWidget
            title={"Utilizatori red flag in ultimile 24 de ore"}
            data={widget_1_data}
          />
        </div>
      </div>
      <div className="column is-one-third-desktop">
        <div className="dashboard-box is-paddingless">
          <DashboardWidget
            title={"Utilizatori logati in aplicatie"}
            data={widget_2_data}
          />
        </div>
      </div>
      <div className="column is-one-third-desktop">
        <div className="dashboard-box is-paddingless">
          <DashboardWidget
            title={"Formulare completate"}
            data={widget_3_data}
          />
        </div>
      </div>
    </div>
  </>
);

export default DashboardWidgets;
