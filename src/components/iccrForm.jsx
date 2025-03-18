import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import {
    BookFill,
    PersonCheckFill,
    FileEarmarkTextFill,
    InfoCircleFill,
    AwardFill,
    GeoAltFill,
    CheckSquareFill,
    Pen,
    TelephoneFill,
    GlobeAmericas
} from 'react-bootstrap-icons';
import axios from 'axios';

const iccrForm = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        country: '',
        passport: '',
        passportCountry: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        city: '',
        state: '',
        addressCountry: '',
        zipcode: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        uniqueId: '',
        fatherName: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherPhone: '',
        motherEmail: '',
        englishProficiency1: '',
        proficiencyLevel: '',
        proficiencyScore: '',
        englishProficiency2: '',
        toeflScore: '',
        ieltsScore: '',
        duolingoScore: '',
        essay: '',
        academicYear: '',
        levelOfCourse: '',
        courseMainStream: '',
        universities: Array(3).fill(''),
        subjects: Array(3).fill(''),
        courseStreams: Array(3).fill(''),
        grade10Certificate: '',
        grade10Country: '',
        grade10Board: '',
        grade10School: '',
        grade10Subjects: '',
        grade10Year: '',
        grade10Percentage: '',
        grade12Certificate: '',
        grade12Country: '',
        grade12Board: '',
        grade12School: '',
        grade12Subjects: '',
        grade12Year: '',
        grade12Percentage: '',
        educationalQualifications: [
            {
                certificate: '',
                country: '',
                boardName: '',
                schoolName: '',
                subjects: '',
                year: '',
                percentage: ''
            }
        ],
        references: [
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            },
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            }
        ],
        indianContacts: [
            {
                name: '',
                relationship: '',
                occupation: '',
                telephone: '',
                email: '',
                postalAddress: ''
            }
        ],
        travelledToIndia: '',
        previousICCRScholarship: '',
        indianResident: '',
        marriedToIndian: '',
        internationalDrivingLicense: '',
        otherInformation: '',
        declarationDate: '',
        declarationPlace: '',
        signature: '', // Add this new field
        documents: {
            permanentUniqueId: null,
            passportCopy: null,
            gradeXMarksheet: null,
            gradeXIIMarksheet: null,
            medicalFitnessCertificate: null,
            englishTranslationOfDocuments: null,
            englishAsSubjectDocument: null,
            anyOtherDocument: null
        },
        studentPhoto: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Add this state

    // Add this initial form data structure
    const initialFormData = {
        fullName: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        country: '',
        passport: '',
        passportCountry: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        city: '',
        state: '',
        addressCountry: '',
        zipcode: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        uniqueId: '',
        fatherName: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherPhone: '',
        motherEmail: '',
        englishProficiency1: '',
        proficiencyLevel: '',
        proficiencyScore: '',
        englishProficiency2: '',
        toeflScore: '',
        ieltsScore: '',
        duolingoScore: '',
        essay: '',
        academicYear: '',
        levelOfCourse: '',
        courseMainStream: '',
        universities: Array(3).fill(''),
        subjects: Array(3).fill(''),
        courseStreams: Array(3).fill(''),
        grade10Certificate: '',
        grade10Country: '',
        grade10Board: '',
        grade10School: '',
        grade10Subjects: '',
        grade10Year: '',
        grade10Percentage: '',
        grade12Certificate: '',
        grade12Country: '',
        grade12Board: '',
        grade12School: '',
        grade12Subjects: '',
        grade12Year: '',
        grade12Percentage: '',
        educationalQualifications: [
            {
                certificate: '',
                country: '',
                boardName: '',
                schoolName: '',
                subjects: '',
                year: '',
                percentage: ''
            }
        ],
        references: [
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            },
            {
                name: '',
                occupation: '',
                email: '',
                telephone: '',
                postalAddress: ''
            }
        ],
        indianContacts: [
            {
                name: '',
                relationship: '',
                occupation: '',
                telephone: '',
                email: '',
                postalAddress: ''
            }
        ],
        travelledToIndia: '',
        previousICCRScholarship: '',
        indianResident: '',
        marriedToIndian: '',
        internationalDrivingLicense: '',
        otherInformation: '',
        declarationDate: '',
        declarationPlace: '',
        signature: '',
        documents: {
            permanentUniqueId: null,
            passportCopy: null,
            gradeXMarksheet: null,
            gradeXIIMarksheet: null,
            medicalFitnessCertificate: null,
            englishTranslationOfDocuments: null,
            englishAsSubjectDocument: null,
            anyOtherDocument: null
        },
        studentPhoto: ''
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();

            // Add all text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'documents' && key !== 'studentPhoto' && key !== 'signature' &&
                    !Array.isArray(formData[key]) && formData[key] !== null && formData[key] !== undefined) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Handle arrays
            if (formData.educationalQualifications) {
                formData.educationalQualifications.forEach((edu, index) => {
                    Object.keys(edu).forEach(key => {
                        formDataToSend.append(`previousEducations[${index}][${key === 'certificate' ? 'degree' : key === 'boardName' ? 'board' : key === 'schoolName' ? 'school' : key}]`, edu[key]);
                    });
                });
            }

            if (formData.universities) {
                formData.universities.forEach((univ, index) => {
                    formDataToSend.append(`universityPreferences[${index}][preference]`, index + 1);
                    formDataToSend.append(`universityPreferences[${index}][university]`, univ);
                    
                    if (formData.subjects[index]) {
                        formDataToSend.append(`universityPreferences[${index}][subject]`, formData.subjects[index]);
                    }
                    
                    if (formData.courseStreams[index]) {
                        formDataToSend.append(`universityPreferences[${index}][course]`, formData.courseStreams[index]);
                    }
                });
            }

            if (formData.references) {
                formData.references.forEach((ref, index) => {
                    Object.keys(ref).forEach(key => {
                        formDataToSend.append(`references[${index}][${key === 'telephone' ? 'phone' : key === 'postalAddress' ? 'address' : key}]`, ref[key]);
                    });
                });
            }

            if (formData.indianContacts) {
                formData.indianContacts.forEach((contact, index) => {
                    Object.keys(contact).forEach(key => {
                        formDataToSend.append(`indianContacts[${index}][${key === 'name' ? 'contactName' : key === 'postalAddress' ? 'address' : key}]`, contact[key]);
                    });
                });
            }

            // Map form fields to backend model fields
            formDataToSend.append('tillWhatLevel1', formData.proficiencyLevel || '');
            formDataToSend.append('score1', formData.proficiencyScore || '');
            formDataToSend.append('travelledInIndia', formData.travelledToIndia || '');
            formDataToSend.append('residenceInIndia', formData.indianResident || '');
            formDataToSend.append('dateOfApplication', formData.declarationDate || '');
            formDataToSend.append('placeOfApplication', formData.declarationPlace || '');

            // Handle file uploads
            if (formData.studentPhoto) {
                const photoFile = await fetch(formData.studentPhoto).then(r => r.blob());
                formDataToSend.append('studentPhoto', photoFile, 'studentPhoto.jpg');
            }

            if (formData.signature) {
                const signatureFile = await fetch(formData.signature).then(r => r.blob());
                formDataToSend.append('signature', signatureFile, 'signature.jpg');
            }

            // Handle document uploads
            if (formData.documents) {
                if (formData.documents.permanentUniqueId) {
                    formDataToSend.append('permanentUniqueId', formData.documents.permanentUniqueId);
                }
                if (formData.documents.passportCopy) {
                    formDataToSend.append('passportCopy', formData.documents.passportCopy);
                }
                if (formData.documents.gradeXMarksheet) {
                    formDataToSend.append('gradeXMarksheet', formData.documents.gradeXMarksheet);
                }
                if (formData.documents.gradeXIIMarksheet) {
                    formDataToSend.append('gradeXIIMarksheet', formData.documents.gradeXIIMarksheet);
                }
                if (formData.documents.medicalFitnessCertificate) {
                    formDataToSend.append('medicalFitnessCertificate', formData.documents.medicalFitnessCertificate);
                }
                if (formData.documents.englishTranslationOfDocuments) {
                    formDataToSend.append('englishTranslationOfDocuments', formData.documents.englishTranslationOfDocuments);
                }
                if (formData.documents.englishAsSubjectDocument) {
                    formDataToSend.append('englishAsSubjectDocument', formData.documents.englishAsSubjectDocument);
                }
                if (formData.documents.anyOtherDocument) {
                    formDataToSend.append('anyOtherDocument', formData.documents.anyOtherDocument);
                }
            }

            const response = await axios.post(
                `https://crm.indiaeducates.org/api/iccr`,
                // `http://localhost:5000/api/iccr`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // If we reach here, the submission was successful
            setShowSuccessModal(true);
            // Reset form data
            setFormData({
                ...initialFormData,
                documents: {
                    ...initialFormData.documents,
                    permanentUniqueId: null,
                    passportCopy: null,
                    gradeXMarksheet: null,
                    gradeXIIMarksheet: null,
                    medicalFitnessCertificate: null,
                    englishTranslationOfDocuments: null,
                    englishAsSubjectDocument: null,
                    anyOtherDocument: null
                }
            });

        } catch (error) {
            console.error('Error submitting application:', error);
            // Only show error alert if it's actually a submission error
            if (!error.message.includes('Failed to reload')) {
                alert('Failed to submit application. Please try again.');
            } else {
                // If it's just a Vite reload error, still show success if data was saved
                setShowSuccessModal(true);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add this function to handle adding new preference
    const handleAddPreference = () => {
        if (formData.universities.length < 5) {  // Maximum 5 preferences
            setFormData(prev => ({
                ...prev,
                universities: [...prev.universities, ''],
                subjects: [...prev.subjects, ''],
                courseStreams: [...prev.courseStreams, '']
            }));
        }
    };

    // Add this function to handle adding new qualification
    const handleAddQualification = () => {
        setFormData(prev => ({
            ...prev,
            educationalQualifications: [
                ...prev.educationalQualifications,
                {
                    certificate: '',
                    country: '',
                    boardName: '',
                    schoolName: '',
                    subjects: '',
                    year: '',
                    percentage: ''
                }
            ]
        }));
    };

    // Add this function to handle qualification changes
    const handleQualificationChange = (index, field, value) => {
        const newQualifications = [...formData.educationalQualifications];
        newQualifications[index] = {
            ...newQualifications[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            educationalQualifications: newQualifications
        }));
    };

    // Add this function to handle reference changes
    const handleReferenceChange = (index, field, value) => {
        const newReferences = [...formData.references];
        newReferences[index] = {
            ...newReferences[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            references: newReferences
        }));
    };

    // Add this function to handle adding new reference
    const handleAddReference = () => {
        if (formData.references.length < 5) {  // Maximum 5 references
            setFormData(prev => ({
                ...prev,
                references: [
                    ...prev.references,
                    {
                        name: '',
                        occupation: '',
                        email: '',
                        telephone: '',
                        postalAddress: ''
                    }
                ]
            }));
        }
    };

    // Add this function to handle Indian contact changes
    const handleIndianContactChange = (index, field, value) => {
        const newContacts = [...formData.indianContacts];
        newContacts[index] = {
            ...newContacts[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            indianContacts: newContacts
        }));
    };

    // Add this function to handle adding new Indian contact
    const handleAddIndianContact = () => {
        if (formData.indianContacts.length < 5) {  // Maximum 5 contacts
            setFormData(prev => ({
                ...prev,
                indianContacts: [
                    ...prev.indianContacts,
                    {
                        name: '',
                        relationship: '',
                        occupation: '',
                        telephone: '',
                        email: '',
                        postalAddress: ''
                    }
                ]
            }));
        }
    };

    // Add this new function to handle signature upload
    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    signature: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Add this new handler for document uploads
    const handleDocumentUpload = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [docType]: file
                }
            }));
        }
    };

    // Add this handler function with your other handlers
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    studentPhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Update the SuccessModal component
    const SuccessModal = () => (
        <Modal
            show={showSuccessModal}
            centered
            size="lg"
            onHide={() => {
                setShowSuccessModal(false);
                setFormData(initialFormData); // Reset form data when closing modal
                window.scrollTo(0, 0); // Scroll to top of page
            }}
        >
            <Modal.Body className="text-center p-5">
                <div className="mb-4">
                    <div className="d-flex justify-content-center">
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#28a745',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <CheckSquareFill style={{ fontSize: '40px', color: 'white' }} />
                        </div>
                    </div>
                    <h2 className="mb-3" style={{ color: '#28a745' }}>Thank You!</h2>
                    <h4 className="mb-4">Your Application Has Been Submitted Successfully</h4>
                    <p className="text-muted mb-4">
                        We have received your ICCR scholarship application. Our team will review your application and contact you soon.
                    </p>
                    <Button
                        variant="success"
                        size="lg"
                        onClick={() => {
                            setShowSuccessModal(false);
                            setFormData(initialFormData); // Reset form data when clicking close button
                            window.scrollTo(0, 0); // Scroll to top of page
                        }}
                        style={{
                            borderRadius: '50px',
                            padding: '10px 30px'
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );


    return (

        <div>
            {/* Application Form */}
            <Row className="mb-5">
                <Col md={10} className="mx-auto">
                    <Card className="border-0" style={{
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        borderRadius: '15px'
                    }}>
                        <Card.Body className="p-4" id="application-form">
                            <div className="mb-5 text-center">
                                <h6 className="text-success mb-2" style={{
                                    fontWeight: '600',
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase'
                                }}>APPLICATION PROCESS</h6>
                                <h2 className="mb-3" style={{
                                    color: '#1a1a1a',
                                    fontWeight: '700',
                                    fontSize: '2.5rem',
                                    lineHeight: '1.3'
                                }}>
                                    START YOUR JOURNEY WITH<br />
                                    <span style={{
                                        color: '#ff5722',
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}>
                                        ICCR SCHOLARSHIP
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-5px',
                                            left: '0',
                                            width: '100%',
                                            height: '4px',
                                            background: 'rgba(255,87,34,0.2)',
                                            borderRadius: '2px'
                                        }}></div>
                                    </span>
                                </h2>
                                <p className="text-muted" style={{
                                    maxWidth: '600px',
                                    margin: '0 auto',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6'
                                }}>
                                    Fill out the application form below with accurate information to begin your educational journey in India.
                                </p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row className="g-4">
                                    {/* Personal Information Card */}
                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4" style={{
                                            borderRadius: '12px',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                        }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                            }}>
                                            <Card.Body className="p-4">
                                                <div className="d-flex align-items-center mb-4">
                                                    <div className="me-3" style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: 'rgba(40,167,69,0.1)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <PersonCheckFill className="text-success" style={{ fontSize: '1.2rem' }} />
                                                    </div>
                                                    <h5 style={{
                                                        color: '#1a1a1a',
                                                        fontWeight: '600',
                                                        margin: '0'
                                                    }}>
                                                        Personal Information
                                                    </h5>
                                                </div>

                                                {/* Existing form fields with enhanced styling */}
                                                <style>
                                                    {`
                                                            .form-control, .form-select {
                                                                border: 1px solid #e0e0e0;
                                                                border-radius: 8px;
                                                                padding: 12px 15px;
                                                                transition: all 0.3s ease;
                                                                background-color: #f8f9fa;
                                                            }
                                                            
                                                            .form-control:focus, .form-select:focus {
                                                                border-color: #28a745;
                                                                box-shadow: 0 0 0 0.2rem rgba(40,167,69,0.15);
                                                                background-color: #fff;
                                                            }

                                                            .form-label {
                                                                color: #495057;
                                                                margin-bottom: 8px;
                                                                font-size: 0.9rem;
                                                            }

                                                            .alert {
                                                                border-radius: 10px;
                                                                border: none;
                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                                            }
                                                        `}
                                                </style>

                                                {/* Keep existing form fields */}
                                                <Row className="g-3">
                                                    {/* Basic Personal Details */}
                                                    <Col md={10}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Full Name (IN BLOCK LETTERS) <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="fullName"
                                                                value={formData.fullName}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="JOHN DOE"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* Photo Upload Section */}
                                                    <Col md={2}>
                                                        <div className="d-flex align-items-start">
                                                            <div className="me-4" style={{ width: '200px' }}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Student Photo</Form.Label>
                                                                    <div
                                                                        onClick={() => document.getElementById('photoUpload').click()}
                                                                        style={{
                                                                            width: '100px',
                                                                            height: '100px',
                                                                            border: '2px dashed #ddd',
                                                                            borderRadius: '10px',
                                                                            overflow: 'hidden',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            backgroundColor: '#f8f9fa',
                                                                            marginBottom: '10px',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.3s ease',
                                                                            position: 'relative'
                                                                        }}
                                                                        onMouseOver={(e) => {
                                                                            e.currentTarget.style.borderColor = '#28a745';
                                                                            e.currentTarget.style.backgroundColor = '#f0f9f2';
                                                                        }}
                                                                        onMouseOut={(e) => {
                                                                            e.currentTarget.style.borderColor = '#ddd';
                                                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                        }}
                                                                    >
                                                                        {formData.studentPhoto ? (
                                                                            <>
                                                                                <img
                                                                                    src={formData.studentPhoto}
                                                                                    alt="Student"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: '100%',
                                                                                        objectFit: 'cover'
                                                                                    }}
                                                                                />
                                                                                <div style={{
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    right: 0,
                                                                                    bottom: 0,
                                                                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    opacity: 0,
                                                                                    transition: 'opacity 0.3s ease',
                                                                                }}
                                                                                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                                                                    onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                                                                                >
                                                                                    <p className="text-white mb-0" style={{ fontSize: '0.8rem' }}>Change Photo</p>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div className="text-center p-3">
                                                                                <i className="bi bi-camera" style={{ fontSize: '2rem', color: '#aaa' }}></i>
                                                                                <p className="text-muted mb-0 mt-2" style={{ fontSize: '0.8rem' }}>
                                                                                    Upload Photo
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <Form.Control
                                                                        id="photoUpload"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handlePhotoUpload}
                                                                        required
                                                                        className="py-2"
                                                                        style={{ display: 'none' }}
                                                                    />
                                                                    {/* <Form.Text className="text-muted d-block">
                                                                             (max 1MB)
                                                                        </Form.Text> */}
                                                                </Form.Group>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    {/* Personal Details Row 1 */}
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Date of Birth <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="dateOfBirth"
                                                                value={formData.dateOfBirth}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Gender <span className="text-danger">*</span></Form.Label>
                                                            <Form.Select
                                                                name="gender"
                                                                value={formData.gender}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Place of Birth <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="placeOfBirth"
                                                                value={formData.placeOfBirth}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="City, Country"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* Contact Information */}
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Mobile Number <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                name="mobileNumber"
                                                                value={formData.mobileNumber}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="+220263765"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">WhatsApp Number</Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                name="whatsappNumber"
                                                                value={formData.whatsappNumber}
                                                                onChange={handleChange}
                                                                className="py-2"
                                                                //="+220263765"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Email ID <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="example@email.com"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* Passport Information */}
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2 text-success">Passport Details</h6>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Passport No <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="passport"
                                                                value={formData.passport}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="AB1234567"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Issue Place <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="passportCountry"
                                                                value={formData.passportCountry}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="City, Country"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Issue Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="passportIssueDate"
                                                                value={formData.passportIssueDate}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Expiry Date <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="passportExpiryDate"
                                                                value={formData.passportExpiryDate}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* Address Information */}
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2 text-success">Postal Address</h6>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Address Line <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="addressLine"
                                                                value={formData.addressLine}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="Street Address"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">City <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="City"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">State/Province <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="state"
                                                                value={formData.state}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="State"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Country <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="addressCountry"
                                                                value={formData.addressCountry}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="Country"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Zipcode <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="zipcode"
                                                                value={formData.zipcode}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                                //="123456"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2">Details of Father/Mother</h6>
                                                        <Row className="g-3">
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Father's Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="fatherName"
                                                                        value={formData.fatherName}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Father's Phone Number</Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="fatherPhone"
                                                                        value={formData.fatherPhone}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                        //="+220263765"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Father's Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        name="fatherEmail"
                                                                        value={formData.fatherEmail}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Mother's Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="motherName"
                                                                        value={formData.motherName}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Mother's Phone Number</Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        name="motherPhone"
                                                                        value={formData.motherPhone}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                        //="+220263765"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Mother's Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        name="motherEmail"
                                                                        value={formData.motherEmail}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2">English Proficiency</h6>
                                                        <Row className="g-3">
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">English Proficiency - I</Form.Label>
                                                                    <Form.Select
                                                                        name="englishProficiency1"
                                                                        value={formData.englishProficiency1}
                                                                        onChange={handleChange}
                                                                        required
                                                                        className="py-2"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="yes">Yes</option>
                                                                        <option value="no">No</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Till What Level</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="proficiencyLevel"
                                                                        value={formData.proficiencyLevel}
                                                                        onChange={handleChange}
                                                                        //="1"
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Score/Percentage</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="proficiencyScore"
                                                                        value={formData.proficiencyScore}
                                                                        onChange={handleChange}
                                                                        //="60"
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">English Proficiency - II</Form.Label>
                                                                    <Form.Select
                                                                        name="englishProficiency2"
                                                                        value={formData.englishProficiency2}
                                                                        onChange={handleChange}
                                                                        className="py-2"
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="yes">Yes</option>
                                                                        <option value="no">No</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">TOEFL Score</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="toeflScore"
                                                                        value={formData.toeflScore}
                                                                        onChange={handleChange}
                                                                        //="NA"
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">IELTS Score</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="ieltsScore"
                                                                        value={formData.ieltsScore}
                                                                        onChange={handleChange}
                                                                        //="NA"
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Duolingo Score</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="duolingoScore"
                                                                        value={formData.duolingoScore}
                                                                        onChange={handleChange}
                                                                        //="NA"
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2">Previous Educational Qualifications</h6>
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Certificate/Degree</th>
                                                                        <th>Country</th>
                                                                        <th>Board Name</th>
                                                                        <th>Name of School/University/Board</th>
                                                                        <th>Subjects Covered</th>
                                                                        <th>Year</th>
                                                                        <th>Percentage(%)/Grade</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {formData.educationalQualifications.map((qual, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.certificate}
                                                                                    onChange={(e) => handleQualificationChange(index, 'certificate', e.target.value)}
                                                                                    //={`e.g., Grade ${index + 10}`}
                                                                                    className="py-2"
                                                                                />
                                                                                <small className="text-muted">
                                                                                    (equivalent to Grade {index + 10} in India)
                                                                                </small>
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.country}
                                                                                    onChange={(e) => handleQualificationChange(index, 'country', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.boardName}
                                                                                    onChange={(e) => handleQualificationChange(index, 'boardName', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.schoolName}
                                                                                    onChange={(e) => handleQualificationChange(index, 'schoolName', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.subjects}
                                                                                    onChange={(e) => handleQualificationChange(index, 'subjects', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.year}
                                                                                    onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    value={qual.percentage}
                                                                                    onChange={(e) => handleQualificationChange(index, 'percentage', e.target.value)}
                                                                                    className="py-2"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        {/* Add Qualification Button */}
                                                        <div className="text-center mt-3">
                                                            <Button
                                                                onClick={handleAddQualification}
                                                                variant="outline-success"
                                                                className="px-4 py-2"
                                                                style={{
                                                                    borderRadius: '50px',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <i className="bi bi-plus-circle me-2"></i>
                                                                Add Another Qualification
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Essay</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={5}
                                                                name="essay"
                                                                value={formData.essay}
                                                                onChange={handleChange}
                                                                //="NA"
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Academic Year</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="academicYear"
                                                                value={formData.academicYear}
                                                                onChange={handleChange}
                                                                //="2025"
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Level of Course</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="levelOfCourse"
                                                                value={formData.levelOfCourse}
                                                                onChange={handleChange}
                                                                //="UG/PG"
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Course Main Stream</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="courseMainStream"
                                                                value={formData.courseMainStream}
                                                                onChange={handleChange}
                                                                //="Science/Commerce/Arts"
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                    <PersonCheckFill className="me-2 text-success" />
                                                    University Preferences
                                                </h5>
                                                <div className="alert alert-warning">
                                                    <small>Note: Once admission is confirmed, no change in either course or University/Institute will be permitted by the Council. Allotment of colleges is done by the respective Universities.</small>
                                                </div>
                                                {formData.universities.map((_, index) => (
                                                    <Row className="g-3 mb-3" key={index}>
                                                        <Col md={2}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Preference {index + 1}</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={index + 1}
                                                                    disabled
                                                                    className="py-2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">University</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`universities-${index}`}
                                                                    value={formData.universities[index]}
                                                                    onChange={(e) => {
                                                                        const newUniversities = [...formData.universities];
                                                                        newUniversities[index] = e.target.value;
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            universities: newUniversities
                                                                        }));
                                                                    }}
                                                                    required
                                                                    className="py-2"
                                                                    //="Enter university name"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Course Stream</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`courseStreams-${index}`}
                                                                    value={formData.courseStreams[index]}
                                                                    onChange={(e) => {
                                                                        const newStreams = [...formData.courseStreams];
                                                                        newStreams[index] = e.target.value;
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            courseStreams: newStreams
                                                                        }));
                                                                    }}
                                                                    required
                                                                    className="py-2"
                                                                    //="e.g., Management and Business Administration"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group>
                                                                <Form.Label className="fw-semibold">Subject</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`subjects-${index}`}
                                                                    value={formData.subjects[index]}
                                                                    onChange={(e) => {
                                                                        const newSubjects = [...formData.subjects];
                                                                        newSubjects[index] = e.target.value;
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            subjects: newSubjects
                                                                        }));
                                                                    }}
                                                                    required
                                                                    className="py-2"
                                                                    //="e.g., Supply Chain"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                ))}

                                                {/* Add Preference Button */}
                                                {formData.universities.length < 5 && (
                                                    <div className="text-center mt-3">
                                                        <Button
                                                            onClick={handleAddPreference}
                                                            variant="outline-success"
                                                            className="px-4 py-2"
                                                            style={{
                                                                borderRadius: '50px',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            <i className="bi bi-plus-circle me-2"></i>
                                                            Add Another Preference
                                                        </Button>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                    <PersonCheckFill className="me-2 text-success" />
                                                    References
                                                </h5>
                                                <div className="alert alert-info">
                                                    <small>Give below the names of two persons who have agreed to testify from their personal knowledge to your character (they must not be related to you and should have direct knowledge of your academic pursuits).</small>
                                                </div>
                                                {formData.references.map((reference, index) => (
                                                    <div key={index} className="mb-4">
                                                        <h6 className="mb-3">Reference {index + 1}</h6>
                                                        <Row className="g-3">
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={reference.name}
                                                                        onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Occupation</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={reference.occupation}
                                                                        onChange={(e) => handleReferenceChange(index, 'occupation', e.target.value)}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        value={reference.email}
                                                                        onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Telephone</Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        value={reference.telephone}
                                                                        onChange={(e) => handleReferenceChange(index, 'telephone', e.target.value)}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Postal Address</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={reference.postalAddress}
                                                                        onChange={(e) => handleReferenceChange(index, 'postalAddress', e.target.value)}
                                                                        required
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}

                                                {/* Add Reference Button */}
                                                {formData.references.length < 5 && (
                                                    <div className="text-center mt-3">
                                                        <Button
                                                            onClick={handleAddReference}
                                                            variant="outline-success"
                                                            className="px-4 py-2"
                                                            style={{
                                                                borderRadius: '50px',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            <i className="bi bi-plus-circle me-2"></i>
                                                            Add Another Reference
                                                        </Button>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Add this section after References and before Submit button */}
                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                    <PersonCheckFill className="me-2 text-success" />
                                                    Details of Close Relative(s) or Friends in India
                                                </h5>
                                                {formData.indianContacts.map((contact, index) => (
                                                    <div key={index} className="mb-4">
                                                        <h6 className="mb-3">Contact {index + 1}</h6>
                                                        <Row className="g-3">
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Name</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={contact.name}
                                                                        onChange={(e) => handleIndianContactChange(index, 'name', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Relationship</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={contact.relationship}
                                                                        onChange={(e) => handleIndianContactChange(index, 'relationship', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Occupation</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={contact.occupation}
                                                                        onChange={(e) => handleIndianContactChange(index, 'occupation', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Telephone</Form.Label>
                                                                    <Form.Control
                                                                        type="tel"
                                                                        value={contact.telephone}
                                                                        onChange={(e) => handleIndianContactChange(index, 'telephone', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Email</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        value={contact.email}
                                                                        onChange={(e) => handleIndianContactChange(index, 'email', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Postal Address</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={contact.postalAddress}
                                                                        onChange={(e) => handleIndianContactChange(index, 'postalAddress', e.target.value)}
                                                                        className="py-2"
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}

                                                {/* Add Contact Button */}
                                                {formData.indianContacts.length < 5 && (
                                                    <div className="text-center mt-3">
                                                        <Button
                                                            onClick={handleAddIndianContact}
                                                            variant="outline-success"
                                                            className="px-4 py-2"
                                                            style={{
                                                                borderRadius: '50px',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(40,167,69,0.2)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                e.currentTarget.style.boxShadow = 'none';
                                                            }}
                                                        >
                                                            <i className="bi bi-plus-circle me-2"></i>
                                                            Add Another Contact
                                                        </Button>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Add this section before the Submit button */}
                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                    <PersonCheckFill className="me-2 text-success" />
                                                    Additional Information
                                                </h5>
                                                <Row className="g-3">
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Have you travelled or lived in India in the past?</Form.Label>
                                                            <Form.Select
                                                                name="travelledToIndia"
                                                                value={formData.travelledToIndia}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Have you ever availed of ICCR Scholarship earlier?</Form.Label>
                                                            <Form.Select
                                                                name="previousICCRScholarship"
                                                                value={formData.previousICCRScholarship}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Are you currently a resident in India?</Form.Label>
                                                            <Form.Select
                                                                name="indianResident"
                                                                value={formData.indianResident}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Are you married to an Indian national?</Form.Label>
                                                            <Form.Select
                                                                name="marriedToIndian"
                                                                value={formData.marriedToIndian}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Do you have an international driving licence?</Form.Label>
                                                            <Form.Select
                                                                name="internationalDrivingLicense"
                                                                value={formData.internationalDrivingLicense}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Any Other Information:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="otherInformation"
                                                                value={formData.otherInformation}
                                                                onChange={handleChange}
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Date</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="declarationDate"
                                                                value={formData.declarationDate}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Place</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="declarationPlace"
                                                                value={formData.declarationPlace}
                                                                onChange={handleChange}
                                                                required
                                                                className="py-2"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    {/* Signature Upload Section - Replace the existing signature upload code with this */}
                                                    <Col md={6}>
                                                        <div className="d-flex align-items-start">
                                                            <div className="me-4" style={{ width: '200px' }}>
                                                                <Form.Group>
                                                                    <Form.Label className="fw-semibold">Upload Your Signature</Form.Label>
                                                                    <div
                                                                        onClick={() => document.getElementById('signatureUpload').click()}
                                                                        style={{
                                                                            width: '200px',
                                                                            height: '100px',
                                                                            border: '2px dashed #ddd',
                                                                            borderRadius: '10px',
                                                                            overflow: 'hidden',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            backgroundColor: '#f8f9fa',
                                                                            marginBottom: '10px',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.3s ease',
                                                                            position: 'relative'
                                                                        }}
                                                                        onMouseOver={(e) => {
                                                                            e.currentTarget.style.borderColor = '#28a745';
                                                                            e.currentTarget.style.backgroundColor = '#f0f9f2';
                                                                        }}
                                                                        onMouseOut={(e) => {
                                                                            e.currentTarget.style.borderColor = '#ddd';
                                                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                        }}
                                                                    >
                                                                        {formData.signature ? (
                                                                            <>
                                                                                <img
                                                                                    src={formData.signature}
                                                                                    alt="Signature"
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: '100%',
                                                                                        objectFit: 'contain'
                                                                                    }}
                                                                                />
                                                                                <div style={{
                                                                                    position: 'absolute',
                                                                                    top: 0,
                                                                                    left: 0,
                                                                                    right: 0,
                                                                                    bottom: 0,
                                                                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    opacity: 0,
                                                                                    transition: 'opacity 0.3s ease',
                                                                                }}
                                                                                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                                                                    onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                                                                                >
                                                                                    <p className="text-white mb-0" style={{ fontSize: '0.8rem' }}>Change Signature</p>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div className="text-center p-3">
                                                                                <i className="bi bi-pen" style={{ fontSize: '2rem', color: '#aaa' }}></i>
                                                                                <p className="text-muted mb-0 mt-2" style={{ fontSize: '0.8rem' }}>
                                                                                    Upload Signature
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <Form.Control
                                                                        id="signatureUpload"
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleSignatureUpload}
                                                                        required
                                                                        className="py-2"
                                                                        style={{ display: 'none' }}
                                                                    />
                                                                </Form.Group>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col md={12}>
                                                        <div className="alert alert-info">
                                                            <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                                                                I hereby declare that the particulars given above are true to the best of my knowledge and belief and that I have understood the financial terms and conditions of the Scholarship Scheme. I hereby undertake to abide by them, and I also undertake to return to my country after completion of my studies in India.
                                                            </p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Add this new section before the Submit button */}
                                    <Col md={12}>
                                        <Card className="border-0 shadow-sm mb-4">
                                            <Card.Body>
                                                <h5 className="mb-4" style={{ color: '#1a1a1a', fontWeight: '600' }}>
                                                    <FileEarmarkTextFill className="me-2 text-success" />
                                                    Required Documents
                                                </h5>
                                                <div className="alert alert-info mb-4">
                                                    <small>I hereby declare that the particulars given above are true to the best of my knowledge and belief and I have understood the Terms and Conditions of the Schholarship Scheme
                                                        and hereby undertake to abide by them. I also undertake to return to my country after completion of my studies in India.Any false information given in the application will be
                                                        liable to cancellation of admission.
                                                    </small>
                                                </div>
                                                <Row className="g-3">
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Permanent Unique ID <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'permanentUniqueId')}
                                                                required
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Passport Copy <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'passportCopy')}
                                                                required
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Front & Back Pages (Document size must be less than 1 MB)</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Grade X Marks/Transcript <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'gradeXMarksheet')}
                                                                required
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Grade XII Marks/Transcript <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'gradeXIIMarksheet')}
                                                                required
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Medical Fitness Certificate <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'medicalFitnessCertificate')}
                                                                required
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 1 MB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">English Translation of Documents</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'englishTranslationOfDocuments')}
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">For non-English documents (size must be less than 3 MB)</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">English as a Subject Document</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'englishAsSubjectDocument')}
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 700 KB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Any Other Document</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                onChange={(e) => handleDocumentUpload(e, 'anyOtherDocument')}
                                                                className="py-2"
                                                            />
                                                            <Form.Text className="text-muted">Document size must be less than 3 MB</Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* Submit Button with enhanced styling */}
                                    <Col md={12} className="text-center mt-5">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="px-5 py-3 d-flex align-items-center justify-content-center mx-auto"
                                            style={{
                                                backgroundColor: '#ff5722',
                                                border: 'none',
                                                borderRadius: '50px',
                                                fontWeight: '600',
                                                boxShadow: '0 4px 12px rgba(255,87,34,0.3)',
                                                transition: 'all 0.3s ease',
                                                minWidth: '250px',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 6px 15px rgba(40,167,69,0.4)';
                                                e.currentTarget.style.backgroundColor = '#28a745';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,87,34,0.3)';
                                                e.currentTarget.style.backgroundColor = '#ff5722';
                                            }}
                                        >
                                            <span className="me-2">{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                                            <i className="bi bi-arrow-right"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <SuccessModal />
        </div>
    )
}

export default iccrForm
