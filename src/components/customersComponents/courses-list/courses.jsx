import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  ListItemButton,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItem,
  ListItemText,
  List,
  Divider,
  CardContent,
  Box,
} from "@mui/material";
import { getEntity } from "../../../utils/requests";

import "./courses.scss";
import Cookies from "js-cookie";

const Lists =
  /**
   * Description placeholder
   * @author Fadel SEWADE
   * @date 18/09/2023 - 16:22:40
   *
   * @returns {JSXElement}
   */
  () => {
    const [error, setError] = useState("");
    const [listCourses, setListCourses] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const loggedId = Cookies.get("loggedId");
          const response = await getEntity(
            `customers/listesCourses/${loggedId}`
          );
          if (response.data.success === true) {
            setListCourses(response.data.results);
            console.log(response.data.results);
          } else {
            setError("Error retrieving stocks");
          }
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);

    const renderList = listCourses.map((element) => (
      <React.Fragment>
        <Divider textAlign="right">{element.monthYear}</Divider>
        <div className="card_div">
          {element.purchases.map((purchase) => (
            <Card
              key={purchase.order_id}
              variant="outlined"
              sx={{ maxWidth: "270px", height: "315px", overflow: "auto" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {purchase.order_id}
                </Typography>
                <List key={purchase.order_id} width={280}>
                  {purchase.purchases_id.map((elem, idx) => (
                    <React.Fragment>
                      <ListItem
                        alignItems="flex-start"
                        key={idx}
                        component="div"
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt={elem.item_name} src={elem.url_photo} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={elem.item_name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Quantity: {elem.quantity} <br />
                                  Price: {elem.price_per_item}
                                </Typography>
                              </React.Fragment>
                            }
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
      <Container sx={{ overflow: "auto" }}>
        <Box sx={{ fontSize: "30px", margin: "5px", fontWeight: 'bold' }}>Purchases List</Box>
        <Box>{renderList}</Box>
      </Container>
    );
  };

export default Lists;
