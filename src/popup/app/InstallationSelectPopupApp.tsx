import { IHtmlPopupAppProps } from "../HtmlPopup";
import { FunctionalComponent } from 'preact';
import './popups.scss';
import { Installation } from "../../state/slices/types";

export interface InstallationSelectPopupAppProps extends IHtmlPopupAppProps {
    installations: Installation[];
    onClear: () => void;
    onSelect: (id: string) => void;
}

export const InstallationSelectPopupApp: FunctionalComponent<InstallationSelectPopupAppProps> = ({
    onClosePopup,
    title,
    installations,
    onClear,
    onSelect,
    closeable,
}) => {
    return <div className="popup popup500">
        	<div className="popup_title">
                <div className="title">{title}</div>
                {closeable && <div onClick={onClosePopup} className="close">X</div>}
            </div>
            <ul className="blank_list">
                    {installations.map(installation => <li key={installation.id}>
                            <button className="button" onClick={() => onSelect(installation.id)}>
                                {installation.id}
                            </button>
                        </li>)}
                        <li><button className="button" onClick={onClear}>DEBUG: clear</button></li>
                </ul>
        </div>;
};