const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => res.send("Hallo ARDINAL SUSANTO"))

app.get("/cekKoneksi",(req, res)=>
    {
        let connection;
        async function checkConnectionDb(){
            try {

                connection = await oracledb.getConnection({
                    user          : "PBB",
                    password      : "PBB",
                    connectString : "180.250.135.148:1521/ORCL"
                });

                const hasilCek = await connection.execute('select current_timestamp from dual');
                
                return hasilCek;
            } catch (error) {
                return error;
            }               
        }

        checkConnectionDb().then(dbRes =>{
            res.send(dbRes);
        }).catch(err =>{
            res.send(err);
        })
    }
)

app.get("/cek",(req,res)=>{    
    async function getRefKecamatan(){
        try{
            let connection;      
        
            connection = await oracledb.getConnection( {
                user          : "PBB",
                password      : "PBB",
                connectString : "180.250.135.148:1521/ORCL"
                });

            const result = await connection.execute('select * from ref_kecamatan');          
            return result;
            
        }catch(error){
            return error;
        }
    }

    getRefKecamatan().then(dbRes =>{
        res.send(dbRes);
    }).catch(err =>{
        res.send(err);
    })
})

app.listen(PORT,
    ()=> {
        console.log(`listen to port ${PORT}`);
    }
)