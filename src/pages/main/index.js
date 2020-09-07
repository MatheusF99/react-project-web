import React, {Component} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

import './style.css'

export default class Main extends Component {
    state = {
        //salvar os dados
        product: [], 
        productInfo:{},
        page: 1
    }
    componentDidMount(){
        //atualizar conforme mudar
        this.loadProducts()
    }

    

    //função com os dados
    loadProducts = async(page = 1) => {  
        //passar a url
        const response = await api.get(`/products?page=${page}`)

        //pegar os dados do array
        const {docs, ...productInfo} = response.data

        this.setState({product: docs, productInfo, page})
    }


    prevPage = () => {
        const{page} = this.state

        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber)

    }

    nextPage = () => {
        const{page, productInfo} = this.state

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }


    //função pra renderizar na tela
    render() {
        //pegar os dados do array
        const {product, page, productInfo} = this.state
        return (
            
            <div className="product-list">
                <Header />
                {
                    product.map(product => (
                        <article key={product._id}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <Link to={`./products/${product._id}`}> Acessar</Link>
                        </article>
                    ))
                }
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled = {page === productInfo.pages} onClick={this.nextPage}>Proximo</button>
            </div>
                <p>Total Produtos: {this.state.product.length}</p>
            </div>
        )
    }
}