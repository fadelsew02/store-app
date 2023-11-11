import { 
    Avatar, 
    Box, 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Pagination, 
    Typography 
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEntity } from '../../../utils/requests'
import './ownerDashboard.scss'

import { HandleRedirectMainStore } from '../../../utils/handle'


const OwnerDashboard = () => {
    const [stores, setStores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [error, setError] = useState('');
    const [text, setText] = useState('More Info!!')

    useEffect(() => {
        async function fetchData() {
          try {
            const fakeId = -1;
            const response = await getEntity(`stores/getAllStores/${fakeId}`);
            if (response.data.success === true) {
                setStores(response.data.results);
            }
          } catch (err) {
            setError("Error retrieving stores");
            console.error(err);
          }
        }
        fetchData();
    }, []);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);

    const renderStores = currentItems.map((store) => (
        <Link to={store.store_id.toString()} key={store.store_id} style={{textDecoration: 'none'}}>
            <Card sx={{ maxWidth: "300px", height: "355px", ":hover": { transform: "scale(1.03)", transition: ".5s"}  }} key={store.store_id} >
                <CardMedia
                    component={"img"}
                    image="../../../assets/images/3935097.jpg"
                    alt="store"
                    sx={{ 
                            height: "210px",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px"
                        }}
                />
                <CardContent sx={{display: 'flex', gap: 5, height: 100}}>
                    <div>
                        <Typography  variant="body2"> <strong><em>Name:</em></strong> {store.store_name}</Typography>
                        {/* <Typography  variant="body2"> <strong><em>Employees:</em></strong> {store.staff_count}</Typography> */}
                        <Typography  variant="body2"><strong><em>Address:</em></strong> {store.address}</Typography>
                        {/* <Typography  variant="body2"><strong><em>Email: </em></strong>{store.contact_email}</Typography>
                        <Typography  variant="body2"><strong><em>Phone: </em></strong>{store.contact_phone}</Typography> */}
                    </div>
                    <div style={{ textAlign: "center"}}>
                        <Avatar>{store.manager_photo}</Avatar>
                        <Typography variant="body2"> {store.manager_surname}</Typography>
                        <Typography variant="body2">{store.manager_firstname}</Typography>
                    </div>
                </CardContent>
                <CardActions 
                    sx={{ 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        background: " rgb(255, 7, 110)",
                        height:50 
                    }}
                >
                    <Button
                        size="large"
                        color="primary"
                        variant="text"
                        onClick={() => HandleRedirectMainStore(store.store_id)}
                    >{text}
                    </Button>
                </CardActions>
            </Card>
        </Link>
    ))

    return (
        <Box className='card-box'>
            {renderStores}
            <Pagination
                count={Math.ceil(stores.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ position: "fixed", bottom: "50px", right: "50px" }}
            />
        </Box>
    )
}

export default OwnerDashboard
