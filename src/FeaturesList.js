import React from 'react';

const styles = {
    listContainer: {
        width: '100%',
        marginTop: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#4CAF50',
        color: 'white'
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left'
    },
    button: {
        marginRight: '5px',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    editButton: {
        backgroundColor: '#f0ad4e',
        color: 'white'
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        color: 'white'
    }
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

function formatDate(dateString) {
    if (!dateString) return ''; 

    const date = new Date(dateString);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear();

    day = day.length < 2 ? '0' + day : day;
    month = month.length < 2 ? '0' + month : month;

    return `${year}-${month}-${day}`;
}

const FeaturesList = ({ features, editFeature, deleteFeature }) => {
    return (
        <div style={styles.listContainer}>
            <h2>Features List</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Complexity</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Target Completion Date</th>
                        <th style={styles.th}>Actual Completion Date</th>
                        <th style={styles.th}>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => (
                        <tr key={feature.id}>
                            <td style={styles.td}>{feature.title}</td>
                            <td style={styles.td}>{feature.description}</td>
                            <td style={styles.td}>{complexityOptions[feature.estimatedComplexity]}</td>
                            <td style={styles.td}>{statusOptions[feature.status]}</td>
                            <td style={styles.td}>{formatDate(feature.targetCompletionDate)}</td>
                            <td style={styles.td}>{formatDate(feature.actualCompletionDate)}</td>

                            <td style={styles.td}>
                                <button style={{...styles.button, ...styles.editButton}} onClick={() => editFeature(feature)}>Edit</button>
                                <button style={{...styles.button, ...styles.deleteButton}} onClick={() => deleteFeature(feature.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeaturesList;
