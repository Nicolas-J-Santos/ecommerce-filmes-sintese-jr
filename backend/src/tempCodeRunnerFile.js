const app = express()
const cors = require('cors'); // add
const port = 3000
app.use(cors()); // add

app.use(express.json())

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!')

    app.use(routersFilme) // Usa a rota que está no arquivo routersFilme.js
    app.use(routersCarrinho) // Usa as rotas que estão no arquivo routersCarrinho.js

    app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`)
    })
  })
  .catch((error) => {
    console.error('Erro ao conectar no MongoDB:', error)
  })