const express=require ('express');
const app=express();
const path=require('path');
const mysql=require('mysql');
const secure = require("ssl-express-www")

  const bodyParser = require('body-parser');

    app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));

app.use(secure)


var pool  = mysql.createPool({
	host:'b0sgcwg4eug60jntides-mysql.services.clever-cloud.com',
	user:'udk8bvtgm70ockbw',
	password:'rzvZ3n60ga1LORXR4jct',
	database:'b0sgcwg4eug60jntides'

});
 
const sql=require('mssql')

//

const mssql={
	user: 'sa',
	password: 'boca',
	server: 'DESKTOP-H99B33U',
	database: 'valjean',
	options:{
		encrypt: true,
	trustServerCertificate: true
	}
}



async function getConnection(){
const poolsql=await sql.connect(mssql)
return poolsql
}



app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use(express.static(path.join(__dirname,'public')));

app.get('/',async(req,res)=>{
	
	const pool=await getConnection()


	const results=await pool.request().query("select * from productos")
	const head=await pool.request().query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'productos'")
	console.log(head)
const hidden=head.recordset
const nosebldo=hidden[1].column_name


	
const topforry=await pool.request().query("SELECT * INTO #temp FROM (SELECT "+nosebldo+", COUNT(*) as count FROM productos GROUP BY "+nosebldo+") AS x SELECT top 4 "+nosebldo+" as elemento,count FROM #temp order by count desc")
	const epapa=topforry.recordset
	const semanda=epapa[0].count

const resultsdy=await pool.request().query("declare @columnas as nvarchar(max) declare @sql as nvarchar(max)='' select @columnas = STUFF((SELECT distinct ',' + QUOTENAME(tipo) FROM productos FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '');set @sql='select region,'+@columnas+' from (select region,tipo,producto from dbo.productos) as src pivot(count(producto) for tipo in ('+@columnas+')) as pvt' execute sp_executesql @sql")
	const headdy=await pool.request().query("SELECT distinct(tipo) from productos")
	console.log(headdy)



			res.render('index',{results:results.recordset,head:head.recordset,resultsd:resultsdy.recordset,headd:headdy.recordset,topf:epapa,maxx:semanda});
		
})

app.post('/vuelta',async(req,res)=>{
	const tavuel=req.body.vuelta


	const pool=await getConnection()

	const topforry=await pool.request().query("SELECT * INTO #temp FROM (SELECT "+tavuel+", COUNT(*) as count FROM productos GROUP BY "+tavuel+") AS x SELECT top 4 "+tavuel+" as elemento,count FROM #temp order by count desc")
	const epapa=topforry.recordset
	const semanda=epapa[0].count

console.log(epapa[0].count)

	const results=await pool.request().query("select * from productos")
	const head=await pool.request().query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'productos'")
	console.log(head)

const resultsdy=await pool.request().query("declare @columnas as nvarchar(max) declare @sql as nvarchar(max)='' select @columnas = STUFF((SELECT distinct ',' + QUOTENAME(tipo) FROM productos FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '');set @sql='select region,'+@columnas+' from (select region,tipo,producto from dbo.productos) as src pivot(count(producto) for tipo in ('+@columnas+')) as pvt' execute sp_executesql @sql")
	const headdy=await pool.request().query("SELECT distinct(tipo) from productos")
	console.log(headdy)



	res.render('index',{results:results.recordset,head:head.recordset,resultsd:resultsdy.recordset,headd:headdy.recordset,topf:epapa,maxx:semanda})
})




app.get('/create',async(req,res)=>{
const pool=await getConnection()
	const results=await pool.request().query("select * from productos")
	const head=await pool.request().query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'productos'")
	console.log(head)

	res.render('create',{head:head.recordset})
})

app.get('/edit/:id',async(req,res)=>{


		const id=req.params.id;
	const pool=await getConnection()
	const results=await pool.request().query("select * from productos where id ='"+id+"'")
	const tujavie=results.recordset
	const lmnt=tujavie[0]
	const elmnt = Object.keys(lmnt).map((key) => [key, lmnt[key]]);



	console.log(elmnt[1][1])
			res.render('edit',{elemento:elmnt});
})

app.get('/delete/:id',async(req,res)=>{
	const id=req.params.id;
	const pool=await getConnection()
	const results=await pool.request().query("delete from productos where id ='"+id+"'")
	
			res.redirect('/');
	
})




app.post('/save',async(req,res)=>{
	 const campos=req.body

	var result = Object.keys(campos).map((key) => [key, campos[key]]);

	

  var elem = result;
  var names = [];
  for (var i = 0; i < elem.length; ++i) {
    if (typeof elem[i][1] !== "undefined") {
        names.push(elem[i][1]);
      }
    }
var champs=[]
    for (var i = 0; i < elem.length; ++i) {
    if (typeof elem[i][0] !== "undefined") {
        champs.push(elem[i][0]);
      }
    }
  
  var webcamval = names;

var elisee=champs

const tuvieja=elisee.toString()

 const camposs="'" + webcamval.join("','") + "'"

  


	
  console.log(camposs)
const pool=await getConnection()
	const results=await pool.request().query("insert into productos ("+tuvieja+") values ("+camposs+")")
	
			res.redirect('/');


}
)


app.post('/bonjour',async(req,res)=>{
	const nuevaa=req.body.nueva
	let nueva= nuevaa.replace(/ /g,"_");
	const pool=await getConnection()
	const results=await pool.request().query("ALTER TABLE productos ADD "+nueva+" varchar(200)")

res.redirect('/')
})

app.post('/aurevoir',async(req,res)=>{
	const seva=req.body.seva
	const pool=await getConnection()
	const results=await pool.request().query("ALTER TABLE productos DROP COLUMN "+seva+"")
	console.log(seva)
setTimeout(function(){
   res.redirect('/')
}, 1000);

	;
})


app.post('/update',async(req,res)=>{
	
 const campos=req.body

	var result = Object.keys(campos).map((key) => [key, campos[key]]);

	

  var elem = result;
  var names = [];
  for (var i = 0; i < elem.length; ++i) {
    if (typeof elem[i][1] !== "undefined") {
        names.push(elem[i][1]);
      }
    }
var champs=[]
    for (var i = 0; i < elem.length; ++i) {
    if (typeof elem[i][0] !== "undefined") {
        champs.push(elem[i][0]);
      }
    }
  
  var webcamval = names;

var elisee=champs

var lafrase=[]
for (var i = 1; i < elem.length; ++i) {
    if (typeof elem[i][0] !== "undefined") {
        lafrase.push(elisee[i]+"='"+webcamval[i]+"'");
      }
    }


var frasee=lafrase.toString()


const tuvieja="'" + elisee.join("','") + "'"

 const camposs="'" + webcamval.join("','") + "'"

  


	
  console.log(frasee)















	const id=req.body.id;
	const producto=req.body.producto;
	const region=req.body.region;
	const tipo=req.body.tipo
	

	const pool=await getConnection()
	const results=await pool.request().query("update productos set "+frasee+" where id='"+id+"'")
	
			res.redirect('/');

})

app.post('/consulta',async(req,res)=>{
	const columna=req.body.columna
	const pivot=req.body.pivot
	const count=req.body.count

	if(columna==pivot||pivot==count||count==columna){
		res.redirect('/')
	}else{


	

	const pool=await getConnection()
	const results=await pool.request().query("select * from productos")
	const head=await pool.request().query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'productos'")
	console.log(head)

const resultsdy=await pool.request().query("declare @columnas as nvarchar(max) declare @sql as nvarchar(max)='' select @columnas = STUFF((SELECT distinct ',' + QUOTENAME("+columna+") FROM productos FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '');set @sql='select "+pivot+",'+@columnas+' from (select "+pivot+","+columna+","+count+" from dbo.productos) as src pivot(count("+count+") for "+columna+" in ('+@columnas+')) as pvt' execute sp_executesql @sql")
	const headdy=await pool.request().query("SELECT distinct("+columna+") from productos")
	
	const aver1=columna
	const aver2=count
	const aver3=pivot

console.log(headdy)

			res.render('consulta',{results:results.recordset,head:head.recordset,resultsd:resultsdy.recordset,headd:headdy.recordset,aver1:aver1,aver2:aver2,aver3:aver3});
}
})



app.listen(process.env.PORT||3000,()=>{});

