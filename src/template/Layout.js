import React from 'react'
import MyApp from '../component/MyApp'
import MyHeader from '../component/MyHeader'
import MyNews from '../component/MyNews'
import MyFooter from '../component/MyFooter'

export default function Layout({ children }) {
    return (
        <div>
            <MyHeader />
            {children}
            <MyNews />
            <MyApp />
            <MyFooter />
        </div>
    )
}
