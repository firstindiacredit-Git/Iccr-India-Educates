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
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

            // Add text fields to FormData
            Object.keys(formData).forEach(key => {
                if (key !== 'documents' && key !== 'studentPhoto' && key !== 'signature' &&
                    !Array.isArray(formData[key]) && formData[key] !== null && formData[key] !== undefined) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Add educational qualifications
            if (formData.educationalQualifications) {
                formData.educationalQualifications.forEach((edu, index) => {
                    Object.keys(edu).forEach(key => {
                        formDataToSend.append(`previousEducations[${index}][${key === 'certificate' ? 'degree' : key === 'boardName' ? 'board' : key === 'schoolName' ? 'school' : key}]`, edu[key]);
                    });
                });
            }

            // Add university preferences
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

            // Add other boolean fields with proper conversion
            formDataToSend.append('travelledInIndia', formData.travelledToIndia || '');
            formDataToSend.append('residenceInIndia', formData.indianResident || '');
            formDataToSend.append('dateOfApplication', formData.declarationDate || '');
            formDataToSend.append('placeOfApplication', formData.declarationPlace || '');

            // Process and compress images before sending
            if (formData.studentPhoto) {
                // Convert base64 to Blob with compression
                const photoFile = await compressAndConvertToBlob(formData.studentPhoto, 'studentPhoto.jpg', 0.7);
                formDataToSend.append('studentPhoto', photoFile);
            }

            if (formData.signature) {
                // Convert base64 to Blob with compression
                const signatureFile = await compressAndConvertToBlob(formData.signature, 'signature.jpg', 0.6);
                formDataToSend.append('signature', signatureFile);
            }

            // Add documents with proper file processing
            if (formData.documents) {
                for (const docType in formData.documents) {
                    if (formData.documents[docType]) {
                        // Compress the document if it's an image
                        if (formData.documents[docType].type.startsWith('image/')) {
                            const compressedFile = await compressFile(formData.documents[docType], 0.6);
                            formDataToSend.append(docType, compressedFile, formData.documents[docType].name);
                        } else {
                            formDataToSend.append(docType, formData.documents[docType]);
                        }
                    }
                }
            }

            const response = await axios.post(
                `https://crm.indiaeducates.org/api/iccr`,
                // `http://localhost:5000/api/iccr`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            setShowSuccessModal(true);
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
            if (!error.message.includes('Failed to reload')) {
                alert('Failed to submit application. Please try again.');
            } else {
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

    const handleAddPreference = () => {
        if (formData.universities.length < 5) {
            setFormData(prev => ({
                ...prev,
                universities: [...prev.universities, ''],
                subjects: [...prev.subjects, ''],
                courseStreams: [...prev.courseStreams, '']
            }));
        }
    };

    const handleAddQualification = () => {
        if (formData.educationalQualifications.length >= 10) {
            alert("Maximum qualifications reached");
            return;
        }

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

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Ensure file size is not larger than 300KB
            if (file.size > 300 * 1024) {
                alert('Signature image size should not exceed 300KB. Please compress your image and try again.');
                e.target.value = ''; // Reset the input
                return;
            }
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

    const handleDocumentUpload = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            // Set file size limits based on document type
            let maxSize = 1024 * 1024; // Default 1MB limit
            
            if (docType === 'englishTranslationOfDocuments' || docType === 'anyOtherDocument') {
                maxSize = 2 * 1024 * 1024; // 2MB for these types
            } else if (docType === 'englishAsSubjectDocument') {
                maxSize = 700 * 1024; // 700KB for this type
            }
            
            if (file.size > maxSize) {
                const sizeInMB = maxSize / (1024 * 1024);
                alert(`File size should not exceed ${sizeInMB}MB for this document type. Please compress your file and try again.`);
                e.target.value = ''; // Reset the input
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                documents: {
                    ...prev.documents,
                    [docType]: file
                }
            }));
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Ensure file size is not larger than 500KB
            if (file.size > 500 * 1024) {
                alert('Image size should not exceed 500KB. Please compress your image and try again.');
                e.target.value = ''; // Reset the input
                return;
            }
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

    const SuccessModal = () => (
        <Modal
            show={showSuccessModal}
            centered
            size="lg"
            onHide={() => {
                setShowSuccessModal(false);
                setFormData(initialFormData);
                window.scrollTo(0, 0);
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
                            setFormData(initialFormData);
                            window.scrollTo(0, 0);
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

    // Helper function to compress and convert base64 to Blob
    const compressAndConvertToBlob = async (base64String, fileName, quality = 0.7) => {
        // Create an image element
        const img = document.createElement('img');
        img.src = base64String;
        
        // Wait for the image to load
        await new Promise(resolve => {
            img.onload = resolve;
        });
        
        // Create a canvas element
        const canvas = document.createElement('canvas');
        
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to blob with compression
        return new Promise(resolve => {
            canvas.toBlob(blob => {
                resolve(new File([blob], fileName, { type: 'image/jpeg' }));
            }, 'image/jpeg', quality);
        });
    };

    // Helper function to compress file
    const compressFile = async (file, quality = 0.6) => {
        // Only compress image files
        if (!file.type.startsWith('image/')) {
            return file;
        }
        
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Maintain aspect ratio but limit dimensions
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                    }, 'image/jpeg', quality);
                };
            };
        });
    };

    return (
        <div>
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

                                                <Row className="g-3">
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
                                                            />
                                                        </Form.Group>
                                                    </Col>
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
                                                                </Form.Group>
                                                            </div>
                                                        </div>
                                                    </Col>
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
                                                            />
                                                        </Form.Group>
                                                    </Col>
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
                                                            />
                                                        </Form.Group>
                                                    </Col>
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
                                                    <Col md={12}>
                                                        <h6 className="mb-3 mt-2">Postal Address</h6>
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
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className="fw-semibold">Academic Year</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="academicYear"
                                                                value={formData.academicYear}
                                                                onChange={handleChange}
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
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                ))}

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
