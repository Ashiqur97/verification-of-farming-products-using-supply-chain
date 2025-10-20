import React, { useState } from 'react';
import { getContract } from '../utils/ethersConfig';
import { CATEGORIES } from '../utils/constants';
import RoleBasedAccess from './RoleBasedAccess';

const BatchCreation = () => {
    const [formData, setFormData] = useState({
        batchId: '',
        certificateId: '',
        category: 0,
        crop: '',
        origin: '',
        harvestDate: '',
    });

    const [loading, setLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    const handleSubmmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const contract = getContract();
            const harvestTimestamp = Math.floor(new Date(formData.harvestDate).getTime() / 1000);
            const tx = await contract.createBatch(
                formData.batchId,
                formData.certificateId,
                formData.category,
                formData.crop,
                formData.origin,
                harvestTimestamp
            );
            await tx.wait();
            setSuccess(true);

            setFormData({
                batchId: '',
                certificateId: '',
                category: 0,
                crop: '',
                origin: '',
                harvestDate: '',
            });
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating batch:', error);
            alert('Error creating batch:' + error.reason || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    return (
        <RoleBasedAccess requiredRole="FARMER">
            <div className='space-y-6'>
                <div className='card animate-slide-in'>
                    <div className='flex items-center mb-6'>
                         <div className="text-3xl mr-4">🌱</div>
                         <div>
                            <h2 className='text-2xl font-bold text-white'>Create New Batch</h2>
                            <p className='text-gray-300'>Register In Agricultural Batch in Supply Chain</p>
                         </div>
                    </div>
                    {success && (
                        <div className='mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl animate-pulse'>
                                <div className='flex items-center'>
                                        <div className='text-2xl'>✅</div>
                                        <div>
                                            <p className='text-green-400 font-semibold'>Batch Created Successfully!</p>
                                            <p className='text-green-300 text-sm'>The Batch has been registered in the supplyChain</p>
                                        </div>
                                </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmmit} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-white font-semibold mb-2'>Batch ID *</label>

                                <input 
                                    type='text'
                                    name='batchId'
                                    value={formData.batchId}
                                    onChange={handleChange}
                                    className='input-field'
                                    placeholder='Enter unique batch ID'
                                    required 
                                />
                            </div>

                            
                        </div>
                    </form>
                </div>
            </div>
        </RoleBasedAccess>
    )

}

export default BatchCreation;