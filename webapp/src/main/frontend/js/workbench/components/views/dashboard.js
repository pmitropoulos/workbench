import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { FormattedTime, injectIntl } from 'react-intl';
import {
  Row, Col,
} from 'reactstrap';

import moment from 'moment';

import * as CardConfig from '../helpers/card-config';
import * as TableConfig from '../helpers/table-config';
import * as ChartConfig from '../helpers/chart-config';
import * as DashboardCardConfig from '../helpers/dashboardCard-config';

import {
  BarChart,
  Card,
  DashboardCard,
  Table,
} from '../helpers';

import { fetchDashboardData, changeDashboardFilter } from '../../ducks/ui/views/dashboard';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchDashboardData();
  }

  render() {

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card { ...CardConfig.ResourceCardConfig(this.props.stats.resources, this.props.intl) } />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card { ...CardConfig.JobCardConfig(this.props.stats.processes, this.props.intl) } />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card { ...CardConfig.SystemCardConfig(this.props.stats.system) } />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card { ...CardConfig.EventCardConfig(this.props.stats.events, this.props.intl) } />
          </div>
        </div>
        <Row>
          <Col className="col-sm-12 col-md-12 col-lg-6">
            <DashboardCard { ...DashboardCardConfig.DashboardProcessExplorerConfig} filterChange={this.props.changeDashboardFilter} filterValue={this.props.filters.processExplorer} >
              <Table
                data={TableConfig.JobGridData(this.props.processes)}
                columns={TableConfig.JobGridColumns}
              />
            </DashboardCard>
          </Col>
          <Col className="col-sm-12 col-md-12 col-lg-6">
            <DashboardCard { ...DashboardCardConfig.DashboardResourcesConfig } filterChange={this.props.changeDashboardFilter} filterValue={this.props.filters.resources} >
              <Table
                data={TableConfig.ResourceGridData(this.props.resources)}
                columns={TableConfig.ResourceGridColumns}
              />
            </DashboardCard>

          </Col>
        </Row >
        <Row>
          <Col className="col-12">
            <DashboardCard { ...DashboardCardConfig.DashboardEventsConfig } filterChange={this.props.changeDashboardFilter} filterValue={this.props.filters.events} >
              <Table
                data={TableConfig.EventGridData(this.props.events)}
                columns={TableConfig.EventGridColumns}
              />
            </DashboardCard>
          </Col>
        </Row >
      </div >
    );
  }
}



//export default Dashboard;
const mapStateToProps = (state) => ({
  stats: state.ui.views.dashboard.statistics,
  processes: state.ui.views.dashboard.processes,
  resources: state.ui.views.dashboard.resources,
  events: state.ui.views.dashboard.events,
  filters: state.ui.views.dashboard.filters,
  //givenName: state.user.profile.givenName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchDashboardData, changeDashboardFilter }, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let resVisible, procVisible;
  switch (stateProps.filters.resources) {
    case 'all':
      resVisible = stateProps.resources;
      break;
    case 'new':
      resVisible = stateProps.resources.filter(resource => moment(resource.createdOn).isAfter(moment().subtract(7, 'd')));
      break;
    case 'updated':
      resVisible = stateProps.resources.filter(resource => moment(resource.updatedOn).isAfter(moment().subtract(7, 'd')) && (resource.updatedOn !== resource.createdOn));
  }
  switch (stateProps.filters.processExplorer) {
    case 'allProcess':
      procVisible = stateProps.processes;
      break;
    case 'completed':
      procVisible = stateProps.processes.filter(process => process.status=='COMPLETED');
      break;
    case 'running':
      procVisible = stateProps.processes.filter(process => process.status=='RUNNING');
      break;
    case 'failed':
      procVisible = stateProps.processes.filter(process => process.status=='FAILED');
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    events: stateProps.filters.events === "ALL" ? stateProps.events : stateProps.events.filter(event => event.level === stateProps.filters.events),
    resources: resVisible,
    processes: procVisible
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(injectIntl(Dashboard));
