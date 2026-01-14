import React, {useState, useEffect} from 'react';
import PublicLayout from '../components/PublicLayout';
import '../styles/home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
                fetch(`http://127.0.0.1:8000/api/random_foods`)
                .then(res=>res.json())
                .then(data => {
                    setFoods(data)
                })
            }, [])  // [] -> means only works on page load
            
    return (
        <PublicLayout>
            <section className='hero py-5 text-center' style = {{backgroundImage: "url('/images/admin-bg.jpeg')"}}>
                <div style = {{
                    padding:"40px 20px", borderRadius:'10px',backgroundColor:'rgba(0,0,0,0.5)'
                    }}>
                    <h1 className='display-4'>Quick & Hot Food, Delievered to you</h1>
                    <p className='lead'>Craving something tasty?, Let's get it to your door!</p>
                    <form method='GET' action='/search' className='d-flex' style={{maxWidth:'600px', margin:'0 auto'}}>
                        <input type='text' name='q' placeholder='I would like to eat...' className='form-control' style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
                        <button style = {{borderTopLeftRadius:0, borderBottomLeftRadius:0}} className='btn btn-warning px-4'>Search</button>
                    </form>
                </div>
            </section>

            <section className='py-5'>
                <div className='container'>
                    <h2 className='text-center mb-2'>Most Loved Dishes, this month
                    <span className='badge bg-danger ms-2'>Top Picks</span>
                    </h2>
                    <div className='row mt-4'>
                    {foods.length === 0 ? (
                        <p className='text-center'>No Item Found</p>
                    ) : (
                         foods.map((food, index) => 
                            <div className='col-md-4 mb-4'>
                                <div className='card hovereffect'>
                                    <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style = {{height:'180px'}}/>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            <Link to='#'>{food.item_name}</Link>
                                        </h5>
                                        <p className='card-text text-muted'>{food.item_description?.slice(0, 50)}...</p>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className='fw-bold'>₹ {food.item_price}</span>
                                            {food.is_available? (
                                            <Link to='' className='btn btn-outline-primary btn-sm'>
                                                <i className='fas fa-shopping-basket me-1'></i>Order Now
                                            </Link>) : (<div>
                                                <button  className='btn btn-outline-secondary btn-sm' title="this food item is not available right now, Please try again later">
                                                    <i className='fas fa-times-circle me-1'></i>Currently Unavailable
                                                </button>
                                            </div>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                    )}
                    
                </div>
                </div>
            </section>
        </PublicLayout>
    )
}

export default Home;