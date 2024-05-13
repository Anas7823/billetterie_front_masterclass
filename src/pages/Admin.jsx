import React from 'react'
import '../assets/css/Admin/admin.css'
import AddEvent from '../components/AdminComponents/AddEvent'
import ListEvents from '../components/AdminComponents/ListEvents'

export default function Admin() {
    return (
        <div className='flex flex-column gap-5'>
            <ListEvents />
            <div className="flex justify-content-center">
                <div className="flex flex-row justify-content-center">
                    <div className=""><AddEvent/></div>
                </div>
            </div>
        </div>
    )
}
