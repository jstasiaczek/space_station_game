import { type IHtmlPopupAppProps } from '../HtmlPopup'
import { type FunctionalComponent } from 'preact'
import './popups.scss'
import { type Installation } from '../../state/slices/types'

export interface InstallationSelectPopupAppProps extends IHtmlPopupAppProps {
    installations: Installation[]
    onClear: () => void
    onSelect: (id: string) => void
}

export const InstallationSelectPopupApp: FunctionalComponent<InstallationSelectPopupAppProps> = ({
    onClosePopup,
    title,
    installations,
    onClear,
    onSelect,
    closeable
}) => {
    return <div className="popup popup400">
        <div className="popup_title">
            <div className="title">{title}</div>
            {closeable && <div onClick={onClosePopup} className="close">X</div>}
        </div>
        <div className="popup_content">
            <ul className="blank_list">
                {installations.map(installation => <li key={installation.id}>
                    <button className="button button--full" onClick={() => { onSelect(installation.id) }}>
                        {installation.id}
                    </button>
                </li>)}
                <li><button className="button button--full" onClick={onClear}>DEBUG: clear</button></li>
            </ul>
        </div>
    </div>
}
