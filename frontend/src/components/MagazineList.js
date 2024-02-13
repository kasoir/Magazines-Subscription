import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MagazineList() {
    const [magazines, setMagazines] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/magazines')
            .then(response => {
                setMagazines(response.data);
            });
    }, []);

    const subscribeToMagazine = (magazine) => {
        axios.post(`http://localhost:3001/subscriptions`, { magazineId: magazine.id, userId: 1, magazineName: magazine.name })
            .then(response => {
                alert('Subscription successful!');
                axios.get('http://localhost:3001/magazines')
                    .then(response => {
                        setMagazines(response.data);
                    });
            })
            .catch(error => {
                alert('An error occurred while subscribing.');
            });
        axios.put(`http://localhost:3001/magazines/${magazine.id}`, {
            name: magazine.name,
            description: magazine.description,
            price: magazine.price,
            subscribed: true,
        })
            .catch(error => {
                alert('An error occurred while subscribing.');
            });

    }

    return (
        <div>
            <Grid container>
                <h1> Magazines </h1>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Subscribe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {magazines.map((magazine) => (
                            <TableRow key={magazine.id}>
                                <TableCell>{magazine.name}</TableCell>
                                <TableCell>{magazine.description}</TableCell>
                                <TableCell>{magazine.price}</TableCell>
                                <TableCell>{new Date(magazine.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" disabled={magazine.subscribed} onClick={() => subscribeToMagazine(magazine)}>
                                        {magazine.subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container justifyContent="flex-end">
                <Button variant="contained" color="primary" component={Link} to="/subscriptions">Subscriptions</Button>
            </Grid>
        </div>
    );
}

export default MagazineList;
