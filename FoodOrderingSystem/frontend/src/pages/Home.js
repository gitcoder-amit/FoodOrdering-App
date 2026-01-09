import React from 'react';
import PublicLayout from '../components/PublicLayout';
import '../styles/home.css'


const Home = () => {
    return (
        <PublicLayout>
            <section className='hero py-5 text-center' style = {{backgroundImage: "url('/images/admin-bg.jpeg')"}}>
                <div style = {{
                    padding:"40px 20px", borderRadius:'10px',backgroundColor:'rgba(0,0,0,0.5)'
                    }}>
                    <h1 className='display-4'>Quick & Hot Food, Delievered to you</h1>
                    <p className='lead'>Craving something tasty?, Let's get it to your door!</p>
                    <form method='GET' action='/search' className='d-flex' style={{maxWidth:'600px', margin:'0 auto'}}>
                        <input type='text' name='q' placeholder='I would like to eat' className='form-control' style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
                        <button style = {{borderTopLeftRadius:0, borderBottomLeftRadius:0}} className='btn btn-warning px-4'>Search</button>
                    </form>
                </div>
            </section>

            <section>

            </section>
        </PublicLayout>
    )
}

export default Home;