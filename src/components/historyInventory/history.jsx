import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { Pagination, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import du composant ExpandMoreIcon
import axios from 'axios';

import './history.scss';

const History = (props) => {
    const [history, setHistory] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (tableau) => (event, isExpanded) => {
        setExpanded(isExpanded ? tableau : false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/inventory/history/${props.id_store}`);
                if (response.data.message === "L'historique a bien été récupéré") {
                    setHistory(response.data.donnees);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    
    useEffect(() => {
        if (history && history.length > 0) {
            setHistoryData(history);
        }  
    }, [history]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);

    const renderHistory = currentItems.map((element, index) => (
        <TableRow key={index}>
            <TableCell sx={{textAlign: 'center'}}>{index + 1}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{element.item_name}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{element.quantity}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{element.supplier_name}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{element.movement_date.split('T')[0]}</TableCell>
        </TableRow>
    ));

    return (
        <div className="main-content">
            <div className="row" style={{width: '100%'}}>
                <div className="col-md-12">
                    <div className="table-wrapper">
                        <Accordion expanded={expanded === 'tableau'} onChange={handleChange('tableau')}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="tableau-content"
                                id="tableau-header"
                            >
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                                            <Typography variant="h5" ml="2"> Historique des commandes</Typography>
                                        </div>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Contenu de votre Accordion */}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{textAlign: 'center'}}>N°</TableCell>
                                                <TableCell sx={{textAlign: 'center'}}>Articles</TableCell>
                                                <TableCell sx={{textAlign: 'center'}}>Quantité</TableCell>
                                                <TableCell sx={{textAlign: 'center'}}>Fournisseur</TableCell>
                                                <TableCell sx={{textAlign: 'center'}} >Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {renderHistory}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    count={Math.ceil(historyData.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;

