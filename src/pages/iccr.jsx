import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Dropdown } from 'react-bootstrap';
import {
    BookFill,
    PersonCheckFill,
    FileEarmarkTextFill,
    InfoCircleFill,
    AwardFill,
    GeoAltFill,
    Check2,
    Pen,
    TelephoneFill,
    GlobeAmericas
} from 'react-bootstrap-icons';
import axios from 'axios';
import countryData from '../components/country.json';

// Add CSS for blinking animation
const blinkingAnimationStyle = `
@keyframes blinkColors {
    0% { background-color: #ff5722; transform: scale(1); }
    25% { background-color: #28a745; transform: scale(1.05); }
    50% { background-color: #ff5722; transform: scale(1); }
    75% { background-color: #28a745; transform: scale(1.05); }
    100% { background-color: #ff5722; transform: scale(1); }
}
`;

const ICCR = () => {
    // Add the style element to the component
    React.useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = blinkingAnimationStyle;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedQualification, setSelectedQualification] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        countryCode: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        lastQualification: '',
        course: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Add this state for modal
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Add initialFormData constant
    const initialFormData = {
        fullName: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: '',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formPayload = {
                fullName: formData.fullName,
                countryCode: selectedCountry ? selectedCountry.split(' ')[0] : '',
                mobileNumber: formData.mobileNumber,
                email: formData.email,
                dateOfBirth: formData.dateOfBirth,
                gender: selectedGender,
                lastQualification: selectedQualification,
                course: selectedCourse
            };

            const response = await axios.post('https://crm.indiaeducates.org/api/form1', formPayload);
            // const response = await axios.post('http://localhost:5000/api/form1', formPayload);


            if (response.data.success) {
                setSuccess(true);
                setShowSuccessModal(true); // Show modal on success
                // Reset form
                setFormData(initialFormData);
                setSelectedCountry('');
                setSelectedGender('');
                setSelectedQualification('');
                setSelectedCourse('');
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setError('You have already submitted an application with this email or phone number. Please use different contact details.');
            } else {
                setError(err.response?.data?.message || 'Something went wrong!');
            }

            // Scroll to error message
            const errorElement = document.querySelector('.alert-danger');
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } finally {
            setLoading(false);
        }
    };

    // Add this function to handle smooth scrolling
    const scrollToApplicationForm = () => {
        const applicationForm = document.getElementById('application-form');
        if (applicationForm) {
            applicationForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Success Modal Component
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
                            background: '#ff5722',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <Check2 style={{ fontSize: '40px', color: 'white', borderRadius: '50%' }} />
                        </div>
                    </div>
                    <h2 className="mb-3" style={{ color: '#ff5722' }}>Thank You!</h2>
                    <h4 className="mb-4">Your Application Has Been Submitted Successfully</h4>
                    <p className="text-muted mb-4">
                        We have received your ICCR scholarship application. Our team will review your application and contact you soon.
                    </p>
                    <Button
                        size="lg"
                        onClick={() => {
                            setShowSuccessModal(false);
                            setFormData(initialFormData);
                            window.scrollTo(0, 0);
                        }}
                        style={{
                            borderRadius: '50px',
                            padding: '10px 30px',
                            backgroundColor: '#28a745',
                            border: 'none'
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            {/* Enhanced Header */}
            <div className="sticky-top" style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                zIndex: 1000,
                marginBottom: '-3rem',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <Container fluid>
                    <Row className="py-3 align-items-center">
                        <Col xs={12} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                            <a href="https://indiaeducates.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center"
                                style={{ transition: 'transform 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img
                                    src="/images/IndiaEducatesLogo.png"
                                    alt="India Educates Logo"
                                    style={{
                                        height: '45px',
                                        maxWidth: '100%',
                                        cursor: 'pointer',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                    }}
                                />
                            </a>
                        </Col>
                        <Col xs={12} md={7} className="text-center mb-3 mb-md-0">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <h1 className="mb-0 position-relative" style={{
                                    color: '#1a1a1a',
                                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                    textAlign: 'center'
                                }}>
                                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill"
                                        style={{
                                            fontSize: '0.7rem',
                                            fontWeight: '1000',
                                            transform: 'translateY(-50%)',
                                        }}>
                                        New
                                    </span>
                                    ICCR SCHOLARSHIPS
                                </h1>
                                <div className="d-flex align-items-center mt-2">
                                    <span style={{
                                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                                        color: '#666',
                                        fontWeight: '500'
                                    }}>
                                        Your Gateway to Excellence in Indian Education
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={2} className="d-flex align-items-center justify-content-center">
                            <Button
                                className="px-4 py-2 d-flex align-items-center apply-now-button"
                                style={{
                                    backgroundColor: '#ff5722',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: 'clamp(0.875rem, 2vw, 15px)',
                                    fontWeight: '600',
                                    boxShadow: 'none',
                                    transition: 'all 0.3s ease',
                                    width: 'fit-content',
                                    animation: 'blinkColors 1.5s infinite'
                                }}
                                onClick={scrollToApplicationForm}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#28a745';
                                    e.currentTarget.style.animation = 'none';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = '#ff5722';
                                    e.currentTarget.style.animation = 'blinkColors 1.5s infinite';
                                }}
                            >
                                <span className="me-2">APPLY NOW</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0 !important' }}>
                {/* Header Banner*/}
                <div className="d-none d-md-block">
                    <Row className="mb-5">
                        <Col>
                            <Card className="text-center border-0">
                                <Card.Body className="p-0" style={{
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                                    borderRadius: '0 0 15px 15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <Row className="g-0">
                                        <Col md={7} className="text-start p-5 d-flex flex-column justify-content-center">
                                            <div className="position-relative mb-4">
                                                <div className="position-absolute" style={{
                                                    top: '-20px',
                                                    left: '-30px',
                                                    width: '150px',
                                                    height: '150px',
                                                    background: 'radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)',
                                                    borderRadius: '50%'
                                                }}></div>

                                                <span className="badge bg-danger px-3 py-2 mb-3 d-inline-block" style={{
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500',
                                                    letterSpacing: '1px',
                                                    borderRadius: '50px',
                                                    background: 'linear-gradient(45deg, #ff5722, #ff7043) !important'
                                                }}>
                                                    ICCR SCHOLARSHIP 2025
                                                </span>

                                                <h1 className="text-white mb-3 position-relative" style={{
                                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                                    fontWeight: '800',
                                                    lineHeight: '1.2',
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                                    width: 'fit-content'
                                                }}>
                                                    STUDY IN INDIA
                                                    <div className="position-absolute" style={{
                                                        bottom: '-10px',
                                                        left: '0',
                                                        width: '100px',
                                                        height: '4px',
                                                        background: 'linear-gradient(90deg, #ff5722, transparent)',
                                                        borderRadius: '2px'
                                                    }}></div>
                                                    <div className="position-absolute" style={{
                                                        bottom: '-10px',
                                                        right: '0',
                                                        width: '100px',
                                                        height: '4px',
                                                        background: 'linear-gradient(270deg, #28a745, transparent)', // Changed color and direction
                                                        borderRadius: '2px'
                                                    }}></div>
                                                </h1>

                                                <h2 className="text-white-50 mb-4" style={{
                                                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                                    fontWeight: '600',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    Avail Fully Funded Scholarship Program
                                                </h2>
                                            </div>

                                            <div className="mb-4" style={{
                                                width: '60rem',
                                                backgroundColor: '#28a745',
                                                padding: '10px',
                                                borderRadius: '10px',
                                            }}>
                                                <h3 style={{
                                                    color: 'white',
                                                    fontSize: '1.8rem',
                                                    fontWeight: '700',
                                                    marginBottom: '10px',
                                                }}>
                                                    Get up to <span style={{ color: '#d52637' }}>250-300 US Dollar</span> every month stipend
                                                </h3>
                                                <h4 style={{
                                                    color: 'white',
                                                    fontSize: '1.4rem',
                                                    fontWeight: '600'
                                                }}>
                                                    Register now at just <span style={{ color: '#d52637', fontWeight: '700' }}>65$</span>
                                                </h4>
                                            </div>

                                            <div className="d-flex flex-wrap gap-3 mb-4">
                                                <Button
                                                    className="px-5 py-3 d-flex align-items-center"
                                                    style={{
                                                        backgroundColor: '#ff5722',
                                                        border: 'none',
                                                        borderRadius: '50px',
                                                        fontSize: '1.2rem',
                                                        fontWeight: '600',
                                                        boxShadow: 'none',
                                                        transition: 'all 0.3s ease',
                                                        width: 'fit-content',
                                                        animation: 'blinkColors 1.5s infinite'
                                                    }}
                                                    onClick={scrollToApplicationForm}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.backgroundColor = '#28a745';
                                                        e.currentTarget.style.animation = 'none';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.backgroundColor = '#ff5722';
                                                        e.currentTarget.style.animation = 'blinkColors 1.5s infinite';
                                                    }}
                                                >
                                                    <span className="me-2">APPLY NOW</span>
                                                </Button>
                                            </div>

                                            <div className="d-flex flex-wrap gap-3">
                                                <a href="https://wa.me/918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                    <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                        <div className="bg-white p-2 rounded-circle me-3">
                                                            <TelephoneFill style={{ width: '24px', height: '24px', color: '#198754' }} />
                                                        </div>
                                                        <div>
                                                            <small className="text-white-50 d-block">Call Us</small>
                                                            <span className="text-white" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                                                +91-9821694911
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                    <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                        <div className="bg-white p-2 rounded-circle me-3">
                                                            <GlobeAmericas style={{ width: '24px', height: '24px', color: '#198754' }} />
                                                        </div>
                                                        <div>
                                                            <small className="text-white-50 d-block">Visit Us</small>
                                                            <span className="text-white" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                                                indiaeducates.org
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                        <Col md={5} className="position-relative">
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                // background: 'linear-gradient(45deg, rgba(26,26,26,0.8) 0%, transparent 100%)',
                                                zIndex: 1
                                            }}></div>
                                            <img
                                                src="/images/iccr.png"
                                                alt="Student"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/* Mobile Banner - shown only on screens smaller than md */}
                <div className="d-block d-md-none">
                    <Row className="mb-5">
                        <Col>
                            <Card className="text-center border-0">
                                <Card.Body className="p-0" style={{
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                                    borderRadius: '0 0 15px 15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <div className="position-relative">
                                        <img
                                            src="/images/iccr.png"
                                            alt="Student"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                            height: '50%'
                                        }}></div>
                                    </div>

                                    <div className="p-4">
                                        <span className="badge bg-danger px-3 py-2 mb-3 d-inline-block" style={{
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            letterSpacing: '1px',
                                            borderRadius: '50px',
                                            background: 'linear-gradient(45deg, #ff5722, #ff7043) !important'
                                        }}>
                                            ICCR SCHOLARSHIP 2025
                                        </span>

                                        <h1 className="text-white mb-3" style={{
                                            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                                            fontWeight: '800',
                                            lineHeight: '1.2',
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                        }}>
                                            STUDY IN INDIA
                                        </h1>

                                        <h2 className="text-white-50 mb-4" style={{
                                            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                                            fontWeight: '600',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Avail Fully Funded Scholarship Program
                                        </h2>

                                        <div className="mb-4 p-3" style={{
                                            backgroundColor: '#28a745',
                                            borderRadius: '10px',
                                        }}>
                                            <h3 style={{
                                                color: 'white',
                                                fontSize: '1.4rem',
                                                fontWeight: '700',
                                                marginBottom: '10px',
                                            }}>
                                                Get up to <span style={{ color: '#d52637' }}>250-300 US Dollar</span> every month stipend
                                            </h3>
                                            <h4 style={{
                                                color: 'white',
                                                fontSize: '1.2rem',
                                                fontWeight: '600'
                                            }}>
                                                Register now at just <span style={{ color: '#d52637', fontWeight: '700' }}>65$</span>
                                            </h4>
                                        </div>

                                        <Button
                                            className="w-100 py-3 mb-4"
                                            style={{
                                                backgroundColor: '#ff5722',
                                                border: 'none',
                                                borderRadius: '50px',
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                boxShadow: 'none',
                                                transition: 'all 0.3s ease',
                                                animation: 'blinkColors 1.5s infinite'
                                            }}
                                            onClick={scrollToApplicationForm}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#28a745';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.animation = 'none';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = '#ff5722';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.animation = 'blinkColors 1.5s infinite';
                                            }}
                                        >
                                            APPLY NOW
                                        </Button>

                                        <div className="d-flex flex-column gap-3">
                                            <a href="https://wa.me/918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
                                                <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                    <div className="bg-white p-2 rounded-circle me-3">
                                                        <TelephoneFill style={{ width: '20px', height: '20px', color: '#198754' }} />
                                                    </div>
                                                    <div>
                                                        <small className="text-white-50 d-block">Call Us</small>
                                                        <span className="text-white" style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                            +91-9821694911
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
                                                <div className="d-flex align-items-center bg-white bg-opacity-10 p-3 rounded-3">
                                                    <div className="bg-white p-2 rounded-circle me-3">
                                                        <GlobeAmericas style={{ width: '20px', height: '20px', color: '#198754' }} />
                                                    </div>
                                                    <div>
                                                        <small className="text-white-50 d-block">Visit Us</small>
                                                        <span className="text-white" style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                            indiaeducates.org
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Main Content with Side Image */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT THE PROGRAM</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                INTRODUCTION TO<br />
                                                <span style={{ color: '#ff5722' }}>ICCR SCHOLARSHIPS</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <p>
                                                The Government of India offer Scholarships to Malagasy and Comorian students through Indian Council for Cultural Relations (ICCR) under Africa Scholarship Scheme to follow Undergraduate, Postgraduate, M. Phil. /Ph.D. course in various reputed Indian Universities/Institutes.
                                            </p>
                                            <p>
                                                The Scholarship is given for various courses: Agriculture, Commerce and Management, Engineering, Applied course (Journalism and Communication, Tourism Management, Pharmacy, Computer Application, etc…).
                                            </p>
                                            <p>
                                                The applications from interested students for the academic year 2025-26.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we guide you through every step of your educational journey.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                        backgroundImage: 'url("/images/Indiaeducates.jpg")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        padding: '20px',
                                        borderRadius: '0 10px 10px 0'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.62)',
                                            borderRadius: '0 10px 10px 0'
                                        }} />
                                        <img
                                            src="/images/IndiaEducatesLogo1.png"
                                            alt="Indian Education"
                                            style={{
                                                width: '90%',
                                                height: '90%',
                                                objectFit: 'contain',
                                                position: 'relative',
                                                zIndex: 2,
                                                display: 'block',
                                                margin: 'auto',
                                                filter: 'drop-shadow(3px 3px 5px rgba(255, 255, 255, 0.49))',
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* University Showcase */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT UNIVERSITIES</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                INTRODUCTION TO<br />
                                <span style={{ color: '#ff5722' }}>PREMIER INDIAN UNIVERSITIES</span>
                            </h2>
                        </div>
                        <Row className="g-4">
                            {[1, 2, 3, 4].map((num) => (
                                <Col md={3} key={num}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        height: '300px'
                                    }}>
                                        <img
                                            src={`/images/university-${num}.jpg`}
                                            alt={`University ${num}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                            padding: '30px 20px 15px',
                                            color: 'white'
                                        }}>
                                            <h5 className="mb-2">University {num}</h5>
                                            <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                                Excellence in higher education
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/* Eligibility Criteria with Image */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <img
                                        src="/images/eligibility.jpeg"
                                        alt="Eligibility"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '10px 0 0 10px'
                                        }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT ELIGIBILITY</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                EMPOWERING FUTURES WITH<br />
                                                <span style={{ color: '#ff5722' }}>ELIGIBILITY CRITERIA</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must achieve adequate level of English Proficiency as medium of instruction in India is English.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Age Requirements:
                                                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                                            <li className="d-flex align-items-start">
                                                                {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                                <span className="me-2 text-success">•</span>
                                                                <span> Between 18 and 30 years old for Undergraduate/Postgraduate courses</span>
                                                            </li>
                                                            <li className="d-flex align-items-start">
                                                                {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                                <span className="me-2 text-success">•</span>
                                                                <span> Between 18 and 45 years old for PhD Programmes</span>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must be fully fit to be able to stay and complete his/her course in India.</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    {/* <CheckSquareFill className="me-2 mt-1" style={{ color: '#ff5722', flexShrink: 0 }} /> */}
                                                    <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                    <span>Candidates must possess all required supporting documents.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we are dedicated to guiding students toward their academic and career aspirations.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Course Categories with Icons */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">

                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT COURSES</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                EXPLORE OUR<br />
                                <span style={{ color: '#ff5722' }}>AVAILABLE COURSES</span>
                            </h2>
                        </div>
                        <Row className="g-4">
                            {[
                                { name: 'Agriculture', img: 'agriculture.jpg' },
                                { name: 'Engineering', img: 'engineering.jpg' },
                                { name: 'Management', img: 'management.jpg' },
                                { name: 'Computer Science', img: 'computer-science.jpg' },
                                { name: 'Pharmacy', img: 'pharmacy.jpg' },
                                { name: 'Tourism', img: 'tourism.jpg' }
                            ].map((course, idx) => (
                                <Col md={4} key={idx}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        {/* Dark overlay for entire image */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.39)',
                                            zIndex: 1
                                        }} />
                                        <img
                                            src={`/images/${course.img}`}
                                            alt={course.name}
                                            style={{
                                                width: '100%',
                                                height: '300px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                                            padding: '30px 20px 20px',
                                            color: 'white',
                                            zIndex: 2
                                        }}>
                                            <h5 className="mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                                {course.name}
                                            </h5>
                                            <p className="mb-0" style={{
                                                fontSize: '0.9rem',
                                                opacity: 0.9,
                                                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                            }}>
                                                For {course.name.toLowerCase()} professionals, we offer specialized programs and courses.
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                    </Col>
                </Row>

                {/* Required Documents */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">

                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT DOCUMENTS</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                ESSENTIAL DOCUMENTS FOR<br />
                                                <span style={{ color: '#ff5722' }}>YOUR APPLICATION</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                {[
                                                    'All academic certificates and mark sheet from grade 10 with certified English translation attested by the Ministry of Foreign Affairs, if the original documents are not in English.',
                                                    'TOEFL/IELTS and other standardized test scores, if available.',
                                                    'Recommendations/character certificates from existing school/University etc.',
                                                    'Certified copy of valid passport. (Passport should be valid for the duration of the course applied for.)',
                                                    'GMAT score for Commerce and Management course. (If required by the University)',
                                                    'A certificate of physical fitness dully filled by a sworn Doctor.',
                                                    'Synopsis details only for Ph.D. candidates.'
                                                ].map((item, index) => (
                                                    <li key={index} className="mb-3 d-flex align-items-start">
                                                        <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we ensure a smooth application process for all candidates.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <img
                                        src="/images/documents.jpeg"
                                        alt="Required Documents"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '0 10px 10px 0'
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* General Information */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)' }}>
                            <Row className="g-0">
                                <Col md={4}>
                                    <img
                                        src="/images/general-info.png"
                                        alt="General Information"
                                        className="img-fluid h-100"
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '10px 0 0 10px'
                                        }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <div className="mb-4">
                                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>ABOUT INFORMATION</h6>
                                            <h2 className="mb-3" style={{
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                fontSize: '2rem'
                                            }}>
                                                IMPORTANT GUIDELINES FOR<br />
                                                <span style={{ color: '#ff5722' }}>YOUR APPLICATION</span>
                                            </h2>
                                        </div>
                                        <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <ul className="list-unstyled">
                                                {[
                                                    'Online application should be complete in all respects, with all the required information and all necessary supporting documents. Any incomplete application will not be processed further.',
                                                    'The application will not be considered without English translation of documents if the original documents are not in English.',
                                                    'Applicants have the option to apply to 5 Universities/Institutes in the order of their preference of study.',
                                                    'Students should submit a 500-word essay in English to ascertain English proficiency while applying online.',
                                                    'In case of engineering courses, students must have Physics, Chemistry & Mathematics in their school leaving examinations.',
                                                    'For the academic year 2025-26, admissions in Medical/ Paramedical (Nursing / Physiotherapy / anesthesia etc.,) / fashion / law courses / integrated courses such as BALLB (5 Years) / B.Sc. & M.Sc. (5 Years) etc. are not admissible.',
                                                    'Admission of student on the basis of eligibility from one or more than one Indian University does not guarantee award of ICCR sponsored scholarship. Indian Mission will decide on the award of scholarship to applicant and letter of award of scholarship will be issued to student. For award of scholarship the decision of Indian Mission is final and any query regarding it should be taken up with Indian Mission only.'
                                                ].map((item, index) => (
                                                    <li key={index} className="mb-3 d-flex align-items-start">
                                                        <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-muted mb-0">
                                                At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                                we ensure clear communication of all requirements.
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* For Selected Students */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <Card className="bg-warning-subtle border-0">
                            <Card.Body className="p-4">
                                <div className="mb-4">
                                    <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>FOR SELECTED CANDIDATES</h6>
                                    <h2 className="mb-3" style={{
                                        color: '#1a1a1a',
                                        fontWeight: '700',
                                        fontSize: '2rem'
                                    }}>
                                        IMPORTANT INFORMATION FOR<br />
                                        <span style={{ color: '#ff5722' }}>SELECTED STUDENTS</span>
                                    </h2>
                                </div>
                                <div className="text-muted" style={{ lineHeight: '1.8' }}>
                                    <ul className="list-unstyled">
                                        {[
                                            'Selected students are advised to carry some money to meet incidental expenses on arrival to India. A minimum of INR 60,000/- is recommended. (Equivalent to 700 $)',
                                            'For Science courses, the expenditure on laboratory chemicals and other related incidental charges for students pursuing science and agriculture courses will have to be borne by the students themselves.',
                                            'It is compulsory for all ICCR scholarship students to procure Medical Insurance policy with minimum sum assured for Indian Rupees 500,000 per annum. Student must have medical insurance coverage on their own either before travel or immediately after reaching India, whichever is convenient. Students can purchase medical insurance from any of the insurance companies of their choice.'
                                        ].map((item, index) => (
                                            <li key={index} className="mb-3 d-flex align-items-start">
                                                <img src="/images/image.png" style={{ width: '20px', height: '20px' }} className="me-2 mt-1" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <p className="text-muted mb-0">
                                        At <span style={{ color: '#1a1a1a', fontWeight: '600' }}>India Educates</span>,
                                        we ensure all selected students are well-prepared for their journey.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Student Life in India Gallery */}
                <Row className="mb-5">
                    <Col md={10} className="mx-auto">
                        <div className="mb-4">
                            <h6 className="text-success mb-2" style={{ fontWeight: '600' }}>STUDENT LIFE</h6>
                            <h2 className="mb-3" style={{
                                color: '#1a1a1a',
                                fontWeight: '700',
                                fontSize: '2rem'
                            }}>
                                EXPERIENCE<br />
                                <span style={{ color: '#ff5722' }}>LIFE IN INDIA</span>
                            </h2>
                        </div>
                        <Row className="g-3">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <Col md={4} key={num}>
                                    <div className="position-relative" style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        height: '300px'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.39)',
                                            zIndex: 1
                                        }} />
                                        <img
                                            src={`/images/student-life-${num}.jpg`}
                                            alt={`Student Life ${num}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                                            padding: '30px 20px 15px',
                                            color: 'white'
                                        }}>
                                            <h5 className="mb-2">Campus Life</h5>
                                            <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                                                Experience the vibrant student life in India
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

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
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Full Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    required
                                                    style={{
                                                        padding: '0.8rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ced4da',
                                                        boxShadow: 'none'
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Country Code</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            borderRadius: '8px',
                                                            border: '1px solid #ced4da',
                                                            backgroundColor: '#fff',
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {selectedCountry || 'Select Country Code'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{
                                                        width: '100%',
                                                        maxHeight: '300px',
                                                        overflowY: 'auto'
                                                    }}>
                                                        {countryData.countries.map((country, index) => (
                                                            <Dropdown.Item
                                                                key={index}
                                                                onClick={() => setSelectedCountry(`${country.callingCode} (${country.countryName})`)}
                                                                className="d-flex align-items-center gap-2"
                                                            >
                                                                <img
                                                                    src={country.flag}
                                                                    alt={country.countryName}
                                                                    style={{
                                                                        width: '24px',
                                                                        height: '18px',
                                                                        objectFit: 'cover'
                                                                    }}
                                                                />
                                                                <span>{country.callingCode}</span>
                                                                <span>({country.countryName})</span>
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="mobileNumber"
                                                    value={formData.mobileNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter phone number"
                                                    required
                                                    style={{
                                                        padding: '0.8rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ced4da',
                                                        boxShadow: 'none'
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email"
                                                    required
                                                    style={{
                                                        padding: '0.8rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ced4da',
                                                        boxShadow: 'none'
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Date of Birth</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{
                                                        padding: '0.8rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ced4da',
                                                        boxShadow: 'none'
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Gender</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            borderRadius: '8px',
                                                            border: '1px solid #ced4da',
                                                            backgroundColor: '#fff',
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {selectedGender || 'Select Gender'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{
                                                        width: '100%',
                                                        maxHeight: '300px',
                                                        overflowY: 'auto'
                                                    }}>
                                                        {[
                                                            'Male',
                                                            'Female',
                                                            'Transgender',
                                                            'Non-binary',
                                                            'Gender Fluid',
                                                            'Agender',
                                                            'Bigender',
                                                            'Other',
                                                            'Prefer not to say'
                                                        ].map((gender, index) => (
                                                            <Dropdown.Item
                                                                key={index}
                                                                onClick={() => setSelectedGender(gender)}
                                                            >
                                                                {gender}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Last Qualification</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            borderRadius: '8px',
                                                            border: '1px solid #ced4da',
                                                            backgroundColor: '#fff',
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {selectedQualification || 'Select Qualification'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{
                                                        width: '100%',
                                                        maxHeight: '300px',
                                                        overflowY: 'auto'
                                                    }}>
                                                        {[
                                                            'High School',
                                                            'Bachelor\'s Degree',
                                                            'Master\'s Degree',
                                                            'Ph.D.'
                                                        ].map((qualification, index) => (
                                                            <Dropdown.Item
                                                                key={index}
                                                                onClick={() => setSelectedQualification(qualification)}
                                                            >
                                                                {qualification}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label style={{ fontWeight: '500', color: '#333' }}>Course Interested In</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            borderRadius: '8px',
                                                            border: '1px solid #ced4da',
                                                            backgroundColor: '#fff',
                                                            textAlign: 'left'
                                                        }}
                                                    >
                                                        {selectedCourse || 'Select Course'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu style={{
                                                        width: '100%',
                                                        maxHeight: '300px',
                                                        overflowY: 'auto'
                                                    }}>
                                                        {[
                                                            'Engineering',
                                                            'Management',
                                                            'Agriculture',
                                                            'Computer Science',
                                                            'Pharmacy',
                                                            'Tourism'
                                                        ].map((course, index) => (
                                                            <Dropdown.Item
                                                                key={index}
                                                                onClick={() => setSelectedCourse(course)}
                                                            >
                                                                {course}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Form.Group>
                                        </Col>

                                        {/* Error and Success Messages */}
                                        {error && (
                                            <Col md={12}>
                                                <Alert
                                                    variant="danger"
                                                    className="mt-3"
                                                    style={{
                                                        fontSize: '1rem',
                                                        padding: '1rem',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f8d7da',
                                                        borderColor: '#f5c6cb',
                                                        color: '#721c24',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                                        {error}
                                                    </div>
                                                </Alert>
                                            </Col>
                                        )}
                                        {success && (
                                            <Col md={12}>
                                                <Alert variant="success" className="mt-3">
                                                    Application submitted successfully!
                                                </Alert>
                                            </Col>
                                        )}

                                        {/* Submit Button */}
                                        <Col md={12} className="text-center mt-5">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                disabled={loading}
                                                className="px-5 py-3 d-flex align-items-center justify-content-center mx-auto"
                                                style={{
                                                    backgroundColor: '#ff5722',
                                                    border: 'none',
                                                    borderRadius: '50px',
                                                    fontWeight: '600',
                                                    boxShadow: 'none',
                                                    transition: 'all 0.3s ease',
                                                    minWidth: '250px',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    animation: loading ? 'none' : 'blinkColors 1.5s infinite'
                                                }}
                                                onMouseOver={(e) => {
                                                    if (!loading) {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.backgroundColor = '#28a745';
                                                        e.currentTarget.style.animation = 'none';
                                                    }
                                                }}
                                                onMouseOut={(e) => {
                                                    if (!loading) {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.backgroundColor = '#ff5722';
                                                        e.currentTarget.style.animation = 'blinkColors 1.5s infinite';
                                                    }
                                                }}
                                            >
                                                <span className="me-2">
                                                    {loading ? 'Submitting...' : 'Submit Application'}
                                                </span>
                                                {!loading && <i className="bi bi-arrow-right"></i>}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%)', padding: '4rem 0 2rem' }}>
                <Container>
                    <Row className="mb-5">
                        <Col md={3}>
                            <img
                                src="/images/IndiaEducatesLogo.png"
                                alt="India Educates"
                                style={{ height: '60px', marginBottom: '1.5rem' }}
                            />
                            <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', fontWeight: '500' }}>
                                <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> India Educates</a> is a trusted career counseling and education guidance platform dedicated to empowering students to achieve their academic and professional aspirations.
                            </p>

                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>QUICK LINKS</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="https://indiaeducates.org/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Home</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/about-us/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>About Us</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/services/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Services</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>ICCR Scholarships</a></li>
                                <li className="mb-2"><a href="https://indiaeducates.org/contact-us/" className="text-decoration-none" style={{ color: '#333', fontWeight: '500' }}>Contact Us</a></li>
                            </ul>
                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>CONNECT WITH US!</h5>
                            <ul className="list-unstyled">
                                <li className="mb-1 d-flex align-items-start">
                                    <a href="https://www.google.com/maps/place/INDIAEDUCATES/@28.548202,77.238016,318m/data=!3m1!1e3!4m6!3m5!1s0x390ce3039ea8f47b:0xb5a270021cd73e99!8m2!3d28.548202!4d77.2380163!16s%2Fg%2F11ks6lff3x?ll=28.548202,77.238016&z=18&t=m&gl=US&mapclient=embed&cid=13088146621468196505&entry=tts&g_ep=EgoyMDI1MDExNS4wIPu8ASoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-geo-alt me-2" style={{ color: '#333' }}></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>New Delhi, India</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="tel:+918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-telephone me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>+91 8383968877</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="https://wa.me/918383968877" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-whatsapp me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>+91 8383968877</span>
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a href="mailto:info@indiaeducates.org" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-start" style={{ color: '#333' }}>
                                        <i className="bi bi-envelope me-2"></i>
                                        <span style={{ color: '#333', fontWeight: '500' }}>info@indiaeducates.org</span>
                                    </a>
                                </li>
                            </ul>
                        </Col>

                        <Col md={3}>
                            <h5 style={{ color: '#333', marginBottom: '1.5rem', fontWeight: '700' }}>OUR OFFICE TIMINGS</h5>
                            <ul className="list-unstyled" style={{ color: '#333', fontWeight: '500' }}>
                                <li className="mb-1">Mon - Thurs : 08:00 - 13:00</li>
                                <li className="mb-1">Fri - Sat : 08:00 - 12:00</li>
                                <li className="mb-1">Sunday : Close</li>
                            </ul>
                        </Col>
                    </Row>

                    <hr style={{ margin: '2rem 0', borderColor: 'black' }} />

                    <Row>
                        <Col className="text-center" style={{ color: '#333', fontSize: '14px' }}>
                            © 2025 <a href="https://indiaeducates.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> India Educates</a>. All rights reserved | Deployed by
                            <a href="https://pizeonfly.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none" style={{ color: '#ff5722', fontWeight: '500' }}> PizeonFly</a>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Add SuccessModal component before the closing tag */}
            <SuccessModal />
        </>
    );
};

export default ICCR;