import React, {useState} from 'react'; 
import { Plus } from 'lucide-react'; 
import { createPortal } from "react-dom";
import { SearchModal } from "./SearchModal";

/** 
 * provides search functionality widget to be used in overview and alerts pages
 */
export const SearchWidget = ({onAddLocation}) => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    return (
        <div className="weather-card add-card">
            <div 
            onClick={() => {
                setShowSearchModal(true);
            }}
            className="add-location-button"
            >
            <Plus className="plus-icon" />
            <span>Add Location</span>
        </div>
        {showSearchModal &&
            createPortal(
            <SearchModal
                onClose={() => setShowSearchModal(false)}
                onSubmit={onAddLocation}
            />,
            document.body
            )}
        </div>
    );
}; 