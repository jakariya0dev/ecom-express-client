"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function ({name, icon, value}) {
  return (
    <motion.div 
    className='bg-[#1e1e1e] backdrop-blur-md outline-hidden shadow-lg rounded-xl border border-[#2f2f2f]'
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'}}
    transition={{ duration: 0.5 }}

    >
        <div className='flex items-center justify-between p-4'>
            <span className='text-gray-100'>{name}</span>
            {icon}
        </div>
        <div className='flex items-center justify-between p-4'>
            <h1 className='text-2xl font-semibold text-gray-100'>{value}</h1>
        </div>
    </motion.div>
  )
}
