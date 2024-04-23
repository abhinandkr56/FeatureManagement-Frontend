import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeaturesList from './FeaturesList';
import FeatureForm from './FeatureForm';
import Modal from './Modal';
import Snackbar from './Snackbar';
import "./App.css"
const BASE_URL = "http://localhost:5268";

const App = () => {
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');


  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(BASE_URL +'/api/productfeatures');
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const addFeature = async (feature) => {
    try {
      console.log(feature);
      const response = await axios.post(BASE_URL + '/api/productfeatures', feature, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      setFeatures([...features, response.data]);
      setModalOpen(false);
      setSnackMessage('Added successfully');
    } catch (error) {
      console.error('Error adding feature:', error);
      setSnackMessage('Error adding feature:', error);

    }
  };

  const updateFeature = async (updatedFeature) => {
    try {
      console.log(updatedFeature)
        const response = await axios.put(BASE_URL + `/api/productfeatures/${updatedFeature.id}`, updatedFeature, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setFeatures([...features, updatedFeature]);
        setModalOpen(false);
        setSnackMessage('Updated successfully');
    } catch (error) {
        console.error('Error updating feature:', error);
        setSnackMessage(`Error updating feature: ${error.message}`);
    }
};


  const deleteFeature = async (id) => {
    try {
      await axios.delete(BASE_URL+`/api/productfeatures/${id}`);
      setFeatures(features.filter(feature => feature.id !== id));
      setSnackMessage('Deleted successfully');
    } catch (error) {
      console.error('Error deleting feature:', error);
      setSnackMessage('Error deleting feature:', error);

    }
  };

  const handleAddClick = () => {
    setCurrentFeature({ id: null, title: '', description: '', estimatedComplexity: '', status: '' });
    setEditing(false);
    setModalOpen(true);
  };

  const handleEditClick = (feature) => {
    setCurrentFeature(feature);
    setEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <button className="add-feature-btn" onClick={handleAddClick}>Add Feature</button>
      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <FeatureForm
          saveFeature={editing ? updateFeature : addFeature}
          editing={editing}
          setEditing={setEditing}
          currentFeature={currentFeature}
        />
      </Modal>
      <FeaturesList
        features={features}
        editFeature={handleEditClick}
        deleteFeature={deleteFeature}
      />
      <Snackbar message={snackMessage} setMessage={setSnackMessage} />

    </div>
  );
};

export default App;
