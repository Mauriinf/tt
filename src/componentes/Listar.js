

import React,{useState,useEffect } from 'react';
import { Button, Card, CardContent, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ChildModal from './ChildModal';
import constants from './constants';
const Listar = () => {
    const [videos, setVideos,votos] = useState([]);
    const[buscar,setbuscar]=useState('');
    const loadTasks = async () => {
      const response = await fetch("http://localhost:8080/api/movies");
      const data = await response.json();
      setVideos(data);
    };
    var LowerBuscar=buscar.toLowerCase();
    //filtrar busqueda
    var listVideos=videos.filter(obj=> obj.title.toLowerCase().includes(LowerBuscar));
    //AGRUPAR JSON POR CATEGORIA
    const result = Object.entries(listVideos.reduce((acc, { id,title, photoUrL, category }) => {
        acc[category] = (acc[category] || []);
        acc[category].push({ id,title, photoUrL });
        return acc;
      }, {})).map(([key, photoUrL]) => ({ categoria: key, datos: photoUrL }));
    useEffect(() => {
      loadTasks();
    }, []);
    function contar_votos(titulo,cat){
      constants.miArray.push("-"+titulo+" - "+cat);
    }
    return (
      <>
        <div>

            <h1 align="center">Movie Awards</h1>
            <TextField fullWidth label="Buscar" id="buscar" value={buscar} onChange={(ev)=>setbuscar(ev.target.value)} />
            {result.map(({categoria, datos}, i) => {
            return <div key={i} className="card">
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">
                        <h1>{categoria}</h1>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                </TableContainer>
                <br></br>
                <div className="row">
                {datos.map((row, j) => {
                        return (
                          <div className="col-md-4" align="center" key={j}>
                            
                            <div className="thumbnail" style={{backgroundColor: '#E6E2E1',margin: 20}} >
                              <div className="caption">
                                  <h3>{row.title}</h3>
                              </div>
                              <a href={row.photoUrL}>
                                <img className="img-circle" alt="Cinque Terre" width="304" height="236" 
                                src={`${row.photoUrL}?w=288&fit=crop&auto=format`}
                                srcSet={`${row.photoUrL}?w=288&fit=crop&auto=format&dpr=6 6x`}
                                alt={row.title}
                                loading="lazy" 
                                style={{width: 250,  height: 250,borderRadius: 250 / 2}}
                                />
                                
                              </a>
                              <Button variant="contained" color="success" onClick={() => contar_votos(row.title,categoria)}>Votar</Button>
                            </div>
                          </div>
                          );
                            
                  })}
                </div>

                
                
            </div>
            })}
            <div align="center">
            <ChildModal ></ChildModal>
            </div>
        
        </div>
      </>
    );
  };
  
  export default Listar;