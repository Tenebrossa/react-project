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
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'E-mail', field: 'email'},
    { title: 'Password', field: 'password'},
    { title: 'Administrator', field: 'isAdmin', type: 'boolean'}
];

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            tasks: []
        };
    }

    componentDidMount() {
        const users = localStorage["users"] ? JSON.parse(localStorage["users"]) : [];
        const user = JSON.parse(window.localStorage.getItem("currentUser"));
        const tasks = localStorage["tasks"] ? JSON.parse(localStorage["tasks"]) : [];

        if (!user.isAdmin) {
            window.location.href = "/tasks-list";
        }

        this.setState({
          users,
          tasks
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.tableContainer}>
                <MaterialTable
                        title="Users List"
                        columns={COLUMNS}
                        data={this.state.users}
                        editable={{
                            onRowAdd: newData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const id = '_' + Math.random().toString(36).substr(2, 9);
                                  const newUser = {
                                    id,
                                    firstName: newData.firstName,
                                    lastName: newData.lastName,
                                    email: newData.email,
                                    password: newData.password,
                                    isAdmin: !!newData.isAdmin
                                  };

                                  localStorage["users"] = JSON.stringify([newUser, ...this.state.users]);

                                  this.setState({users: [...this.state.users, newUser]});
                                  
                                  resolve();
                                }, 1000)
                            }),
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const updatedUsers = [...this.state.users];
                                  const index = oldData.tableData.id;

                                  newData.status = !!newData.status;
                                  updatedUsers[index] = newData;
                                  localStorage["users"] = JSON.stringify(updatedUsers);
                                    
                                  this.setState({
                                    users: updatedUsers
                                  });
                    
                                  resolve();
                                }, 1000)
                            }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const dataDelete = [...this.state.users];
                                  const index = oldData.tableData.id;
                                  const tasks = this.state.tasks.filter(task => oldData.id !== task.userId);

                                  dataDelete.splice(index, 1);
                                  localStorage["tasks"] = JSON.stringify(tasks);
                                  localStorage["users"] = JSON.stringify(dataDelete);
                                  
                                  this.setState({
                                    users: dataDelete
                                  });
                    
                                  resolve();
                                }, 1000)
                            }),
                          }}
                    />
                </div>
        )
    }
}

export default withStyles(styles)(UsersList);