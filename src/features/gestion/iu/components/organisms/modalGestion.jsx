import { useState, useEffect } from 'react';
import { ComunitySelectors } from '../molecules';
import { SelectMunicipy } from '../atoms';
import PrimaryButton from '../../../../../common/iu/components/atoms/button';
import { getMunicipalitiesByState } from '../../../../landing/services/municipalityService';

const COMMUNITY_OPTIONS = ["CAM", "USAER", "PARTICULAR", "ADAS", "ASODECH", "ConexSor", "OTRO"];
const CHIAPAS_STATE_ID = 1;

export const ModalGestion = ({ isOpen, onClose, onApplyFilters, onClearFilters, initialFilters = {} }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(initialFilters.community || "Todos");
    const [selectedMunicipality, setSelectedMunicipality] = useState(initialFilters.municipality || "");
    const [municipalities, setMunicipalities] = useState([]);
    const [isLoadingMunicipalities, setIsLoadingMunicipalities] = useState(true);

    // Fetch municipalities on component mount
    useEffect(() => {
        const fetchMunicipalities = async () => {
            setIsLoadingMunicipalities(true);
            try {
                const municipalityNames = await getMunicipalitiesByState(CHIAPAS_STATE_ID);
                const municipalityOptions = municipalityNames.map(name => ({
                    value: name,
                    label: name
                }));
                setMunicipalities(municipalityOptions);
            } catch (error) {
                console.error('Error loading municipalities:', error);
                setMunicipalities([]);
            } finally {
                setIsLoadingMunicipalities(false);
            }
        };

        fetchMunicipalities();
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsAnimating(true);
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Update local state when initialFilters change
    useEffect(() => {
        setSelectedCommunity(initialFilters.community || "Todos");
        setSelectedMunicipality(initialFilters.municipality || "");
    }, [initialFilters]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 300);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleApplyFilters = () => {
        const filters = {
            community: selectedCommunity === "Todos" ? "" : selectedCommunity,
            municipality: selectedMunicipality
        };
        onApplyFilters(filters);
        handleClose();
    };

    const handleClearFilters = () => {
        setSelectedCommunity("Todos");
        setSelectedMunicipality("");
        onClearFilters();
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black/40' : 'bg-black/0'
                }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-2xl transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-pink-ia text-white rounded-full hover:bg-opacity-90 transition-colors flex items-center justify-center"
                    aria-label="Cerrar"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal content */}
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Filtros</h3>

                    <ComunitySelectors
                        options={COMMUNITY_OPTIONS}
                        value={selectedCommunity}
                        onChange={setSelectedCommunity}
                    />

                    <SelectMunicipy
                        options={municipalities}
                        value={selectedMunicipality}
                        onChange={(e) => setSelectedMunicipality(e.target.value)}
                        isLoading={isLoadingMunicipalities}
                    />

                    <section className='flex gap-x-4 items-center justify-end mt-4'>
                        <button
                            className='text-pink-ia underline hover:text-pink-600 transition-colors'
                            onClick={handleClearFilters}
                        >
                            Quitar filtros
                        </button>
                        <PrimaryButton
                            text="Mostrar resultados"
                            onClick={handleApplyFilters}
                            className="!py-2 !px-4 !text-base"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
};