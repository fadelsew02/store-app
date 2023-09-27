import React, { useState, useEffect } from 'react';
import { Container, Card, ListItemButton, Typography, ListItemAvatar, Avatar, ListItem, ListItemText, List, Divider, CardContent, CardActions, Pagination, Box, CircularProgress } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { getEntity } from '../../../utils/requests';

import { useAuth } from '../../auth/auth'
import './courses.scss';

const Lists = /**
 * Description placeholder
 * @author Fadel SEWADE
 * @date 18/09/2023 - 16:22:40
 *
 * @returns {JSXElement}
 */
() => {

  const [error, setError] = useState('');
  const [listCourses, setListCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const auth = useAuth();
  
  useEffect(()=>{
    async function fetchData() {
      try {
        const response = await getEntity(`customers/listesCourses/${auth.loggedId}`)
        if (response.data.success === true) {
          setListCourses(response.data.results);
        } else {
          setError('Erreur lors de la récupération du stock');
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  },[])

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const purchasesArray = [];
  listCourses.forEach((result) => {
    result.purchases.forEach((purchase) => {
      const existingPurchase = purchasesArray.find((p) => p.order_id === purchase.order_id);
      if (existingPurchase) {
        existingPurchase.purchases.push(purchase);
      } else {
        purchasesArray.push({
          order_id: purchase.order_id,
          purchases: [purchase]
        });
      }
    });
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listCourses.slice(indexOfFirstItem, indexOfLastItem);

  const renderList = currentItems.map((element, id, props) => (
   
    <React.Fragment>
      <Divider textAlign='right'>{element.monthYear}</Divider>
      <div>
        {purchasesArray.map((purchase, index) => (
          <Card key={purchase.order_id} variant="outlined" sx={{ marginBottom: '10px', height: '320px', maxWidth: '300px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Commande ID: {purchase.order_id}
              </Typography>
                <List
                  key={purchase.order_id}
                  height={320}
                  width={300}
                  itemCount={purchasesArray.length}
                >
                {purchase.purchases.map((elem, idx) => (
                  <React.Fragment>
                    <ListItem alignItems="flex-start" style={props.style} key={idx} component="div" disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={elem.item_name} src={elem.url_photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary= {elem.item_name}
                        // secondary={
                        //   <React.Fragment>
                        //     <Typography
                        //       sx={{ display: 'inline' }}
                        //       component="span"
                        //       variant="body2"
                        //       color="text.primary"
                        //     >
                        //       Quantity: {elem.quantity} <br />
                        //       Price: {elem.price_per_item}
                        //     </Typography>
                        //   </React.Fragment>
                        // }
                      />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>

          </Card>
        ))}
      </div>
    </React.Fragment>
  ));

  return (
    <Container>
      <Box sx={{fontSize: '30px', margin: '10px'}}>
        Courses List
      </Box>
      <Box>
        {renderList}
        <Pagination
                count={Math.ceil(listCourses.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ position: 'fixed', bottom: '50px', right: '50px' }}
              />
      </Box>
    </Container>
  );
}

export default Lists;


