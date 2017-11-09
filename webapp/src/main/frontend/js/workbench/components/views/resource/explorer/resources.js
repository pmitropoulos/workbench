import * as React from 'react';
import ReactTable from 'react-table';
import { FormattedTime } from 'react-intl';

const resourceColumns = [
  {
    expander: true,
    Header: 'Ver',
    width: 45,
    Expander: ({ isExpanded, ...rest }) =>{
      if (rest.original.versions.length>0){
        return <div>
          {!isExpanded
            ? rest.original.version
            : <i className="fa fa-code-fork" ></i>}
        </div>;}
      else{
        return <div>{rest.original.version} </div>;
      }
    },
  },
  {
    Header: 'id',
    accessor: 'id',
    maxWidth: 30,
  },
  {
    Header: 'Name',
    id: 'name',
    accessor: r => r.metadata.name,
  },
  {
    Header: 'Path',
    id: 'path',
    accessor: r => r.fileName,
  },
];

const resourceSubColumns = [
  {
    Header: 'Version',
    accessor: 'version',
    maxWidth: 60,
  },
  {
    Header: 'Size',
    accessor: 'fileSize',
  },
  {
    Header: 'updatedOn',
    id: 'updatedOn',
    accessor: r =>  <FormattedTime value={r.updatedOn} day='numeric' month='numeric' year='numeric' />,
  },
];


export default function Resources(props) {
  const pages = props.resources && props.resources.pagingOptions && Math.ceil(props.resources.pagingOptions.count / props.resources.pagingOptions.pageSize);
  return (
    <ReactTable
      name="Resource explore"
      id="resource-explore"
      columns={resourceColumns}
      data={props.resources.items}
      defaultPageSize={10}
      showPageSizeOptions={false}
      manual
      onPageChange={(index) => {
        props.setPager({ ...props.pager, index });
        props.fetchResources({
          pagingOptions: { pageIndex: index, pageSize: props.pager.size }
        });
      }}
      onPageSizeChange={(size) => {
        props.setPager({ ...props.pager, size });
        props.fetchResources({
          pagingOptions: { pageIndex: props.pager.index, pageSize: size }
        });
      }}
      getTrProps={(state, rowInfo) => ({
        onClick: (e) => {
          props.setSelectedResource(rowInfo.row.id);
        },
        style: {
          background: rowInfo && props.selectedResource === rowInfo.row.id ? '#20a8d8' : null,
        }
      })}
      pages={pages}
      page={props.pager.index}
      pageSize={props.pager.size}
      showPagination
      SubComponent= {row => { 
        console.log(row);
        if (row.original.versions.length>0) {
          return (
            <div style={{ padding: "4px" , marginLeft : 10}}>
              <ReactTable
                name="Resource explore"
                id="resource-explore"
                columns= {resourceSubColumns}
                data= {row.original.versions}
                noDataText="No other versions"
                defaultPageSize={Object.keys(row.original.versions).length }
                showPagination={false}
                getTrProps={() => ({style: {lineHeight: 0.8}})}
              />
            </div>
          );
        }
        else {
          return null;
        }
      }}
    />
  );
}

