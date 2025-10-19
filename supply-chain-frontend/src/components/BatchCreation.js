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

        }
    }

}