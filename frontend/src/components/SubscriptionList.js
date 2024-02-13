import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            });
    }, []);

    const cancelSubscription = (id) => {
        axios.put(`http://localhost:3001/subscriptions/${id}/cancel`)
            .then(response => {
                alert('Subscription cancelled successfully!');
                axios.get('http://localhost:3001/subscriptions')
                    .then(response => {
                        setSubscriptions(response.data);
                    });
            })
            .catch(error => {
                alert('An error occurred while cancelling the subscription.');
            });
        }

    return (
        <div>
            <Grid container>
                <h1> Subscriptions </h1>
            </Grid>
            <Grid container>
                <Button variant="contained" color="primary" component={Link} to="/">Back</Button>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Magazine Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Cancel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscriptions.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell>{subscription.magazineName}</TableCell>
                                <TableCell>{subscription.status}</TableCell>
                                <TableCell>{new Date(subscription.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" disabled={subscription.status === 'cancelled'} onClick={() => cancelSubscription(subscription.id)}>
                                        {subscription.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SubscriptionList;
