import React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    tableContainer: {
      margin: '0 auto',
      width: '90%',
      paddingTop: '50px'
    }
  });

const COLUMNS = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Estimate', field: 'estimate', type: 'numeric'},
    { title: 'Status', field: 'status', type: 'boolean'}
];

class TasksList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            currentUser: null
        };
    }

    componentDidMount() {
        const tasks = localStorage["tasks"] ? JSON.parse(localStorage["tasks"]) : [];
        const user = JSON.parse(localStorage["currentUser"]);

        this.setState({
            currentUser: user,
            tasks
        });
    }

    render() {
        const { classes } = this.props;
        const { currentUser } = this.state;
        return (
            <div className={classes.tableContainer}>
                <MaterialTable
                        title="Tasks List"
                        columns={COLUMNS}
                        data={this.state.tasks}
                        editable={{
                            onRowAdd: newData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const id = '_' + Math.random().toString(36).substr(2, 9);
                                  const newTask = {
                                    id,
                                    title: newData.title,
                                    description: newData.description,
                                    estimate: newData.estimate,
                                    status: !!newData.status,
                                    userId: currentUser.id
                                  };

                                  localStorage["tasks"] = JSON.stringify([newTask, ...this.state.tasks]);

                                  this.setState({tasks: [...this.state.tasks, newTask]});
                                  
                                  resolve();
                                }, 1000)
                            }),
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataUpdate = [...this.state.tasks];
                                  const index = oldData.tableData.id;
                                  newData.status = !!newData.status;
                                  dataUpdate[index] = newData;

                                  localStorage["tasks"] = JSON.stringify(dataUpdate);
                                    
                                  this.setState({
                                    tasks: dataUpdate
                                  });
                    
                                  resolve();
                                }, 1000)
                            }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...this.state.tasks];
                                  const index = oldData.tableData.id;
                                  dataDelete.splice(index, 1);

                                  localStorage["tasks"] = JSON.stringify(dataDelete);
                                  
                                  this.setState({
                                    tasks: dataDelete
                                  });
                    
                                  resolve();
                                }, 1000)
                            }),
                            isDeleteHidden: rowData => {
                                const canEditTask = rowData.userId === currentUser.id;

                                if (canEditTask) {
                                  return false;
                                } else if (currentUser.isAdmin) {
                                  return false;
                                }

                                return true;
                            },
                            isEditHidden: rowData => {
                                const canEditTask = rowData.userId === currentUser.id;
                                
                                if (canEditTask) {
                                  return false;
                                } else if (currentUser.isAdmin) {
                                  return false;
                                }

                                return true;
                            }
                          }}
                    />
                </div>
        )
    }
}

export default withStyles(styles)(TasksList);