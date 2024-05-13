import React from 'react'
import '../assets/css/Admin/admin.css'
import ListEvents from '../components/AdminComponents/ListEvents'

export default function Admin() {
    return (
        <div className='flex flex-column gap-5'>
            <ListEvents />
            <div className="flex justify-content-center">
                <div className="flex flex-row justify-content-between w-500">
                    <div className="">Hello</div>
                    <div className="">Hello</div>
                </div>
            </div>
        </div>
    )
}
