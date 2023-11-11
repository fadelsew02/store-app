import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEntity } from '../../../utils/requests'

const StoreCard = ( { store } ) => {

    const [store_Information, setStore_Information] = useState(null)

    useEffect( () => {
        async function fetchData(){
            console.log(store)
            alert('cc')
            try {
                const response =  await getEntity(`stores/getAllStores/${store}`);
                if(response.data.success === true){
                    console.log(response.data)
                    setStore_Information(response.data.results)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchData();
    }, [])


    return (
        <Card sx={{ maxWidth: "300px", height: "330px" }} key={store_Information.store_id}>
            <CardMedia
                component={"img"}
                image="https://fr.freepik.com/vecteurs-libre/boutique-panneau-ouvert_8478120.htm#query=magasins&position=30&from_view=search&track=sph"
                alt=""
                sx={{ 
                    height: "210px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                }}
            />
            <CardContent sx={{display: 'flex'}}>
                <div>
                    <Typography  variant="body2">{store_Information.store_name}</Typography>
                    <Typography  variant="body2">{store_Information.staff_count}</Typography>
                    <Typography  variant="body2">{store_Information.address}</Typography>
                    <Typography  variant="body2">{store_Information.contact_email}</Typography>
                    <Typography  variant="body2">{store_Information.contact_phone}</Typography>
                </div>
                <div>
                    <Avatar>{store.manager_photo}</Avatar>
                    <Typography variant="body2"> {store_Information.manager_surname}</Typography>
                    <Typography variant="body2">{store_Information.manager_firstname}</Typography>
                </div>
            </CardContent>
            <CardActions 
                sx={{ 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    background: " rgb(255, 7, 110)"  
                }}
            >
                <Button
                    size="large"
                    color="primary"
                    variant="text"
                >
                    <Link to='dashboard'>Go Back</Link>
                </Button>
                <Button
                    size="large"
                    color="primary"
                    variant="text"
                >
                    Graphics
                </Button>
            </CardActions>
        </Card>
    )
}

export default StoreCard
