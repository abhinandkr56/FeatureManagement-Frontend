import React, { useState, useEffect } from 'react';

const FeatureForm = ({ saveFeature, editing, setEditing, currentFeature }) => {
    const initialFormState = {
        title: '',
        description: '',
        estimatedComplexity: 0,
        status: 0,
        targetCompletionDate: "2024-04-14T17:15:25.373Z",
        actualCompletionDate: "2024-04-14T17:15:25.373Z"
    };

    const [feature, setFeature] = useState(initialFormState);

    useEffect(() => {
        if (editing && currentFeature) {
            const formattedFeature = {
                ...currentFeature,
                targetCompletionDate: currentFeature.targetCompletionDate ? formatDate(currentFeature.targetCompletionDate) : '',
                actualCompletionDate: currentFeature.actualCompletionDate ? formatDate(currentFeature.actualCompletionDate) : '',
            };
            setFeature(formattedFeature);
        } else {
            // Reset the form when not editing
            setFeature(initialFormState);
        }
    }, [editing, currentFeature]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFeature({ ...feature, [name]: value });
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const complexityOptions = {
        0: 'S',
        1: 'M',
        2: 'L',
        3: 'XL'
    };
    
    const statusOptions = {
        0: 'New',
        1: 'Active',
        2: 'Closed',
        3: 'Abandoned'
    };
    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
    return (
        <form
            style={formStyle}
            onSubmit={(event) => {
                event.preventDefault();
                if (!feature.title || !feature.description) return;
                console.log(feature)
                saveFeature(feature);
                setEditing(false);
                setFeature(initialFormState); // Reset the form after submission
            }}
        >
            <label>Title</label>
            <input type="text" name="title" value={feature.title} onChange={handleInputChange} style={inputStyle} />

            <label>Description</label>
            <textarea name="description" value={feature.description} onChange={handleInputChange} style={inputStyle} />

            <label>Complexity</label>
            <select name="estimatedComplexity" value={feature.estimatedComplexity} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Complexity</option>
                {Object.entries(complexityOptions).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>

            <label>Status</label>
            <select name="status" value={feature.status} onChange={handleInputChange} style={inputStyle}>
                <option value="">Select Status</option>
                {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>

            <label>Target Completion Date</label>
            <input type="date" name="targetCompletionDate" value={feature.targetCompletionDate} onChange={handleInputChange} style={inputStyle} />

            <label>Actual Completion Date</label>
            <input type="date" name="actualCompletionDate" value={feature.actualCompletionDate} onChange={handleInputChange} style={inputStyle} />

            <button style={buttonStyle}>{editing ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default FeatureForm;
