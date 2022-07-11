import React, { useState, useRef, useEffect } from 'react';
import { Row, Col} from 'framework7-react';

import DovellousHelper from "../../../system/libs/helper";

// @ts-ignore
export default ({attachmentDetails}) => {

    const [attachment, setAttachment] = useState({iconMimeMedia: iconMimeTXT, name:"Document.txt", size:10000, type: "text", pages: 50});

    useEffect(() => {
        setTimeout(() => {
            setAttachmentDetails(attachmentDetails);
        }, 1000);
    });

    const setAttachmentDetails = (att: { type: string; name: any; size: any; pages: any; }): void =>{

        setAttachment(
            {
                icon: DovellousHelper.mimeTypes.getFileIcon(att.type),
                name:att.name,
                size: DovellousHelper.snippets.humanFileSize(att.size, true),
                type: att.type.toUpperCase(),
                pages: att.pages,
            });

    }

    return <React.Fragment>
        <div className="im-attachment-description-wrapper">
            {(attachment.preview && attachment.preview.length > 5) && (
                <div className="im-attachment-preview-wrapper">
                    <img src={attachment.preview} className="im-attachment-preview-image" alt={attachment.preview} />
                </div>
            )}
            <div className="im-attachment-description-icon-wrapper">
                <Row>
                    <Col className="im-attachment-icon" width="20">
                        <img src={attachment.icon} className="im-attachment-icon-image" alt={attachment.name} width="32"/>
                    </Col>
                    <Col className="im-attachment-title" width="80">
                        {attachment.name}
                    </Col>
                </Row>
            </div>
            <div className="im-attachment-description-details-wrapper">
                <div className="im-attachment-description-details-text" width="35">
                    <React.Fragment>
                        <span className="">
                            • {attachment.size}
                        </span>
                        <span className="">
                            • {attachment.type}
                        </span>
                        <span className="">
                            {(attachment.pages > 0) && (
                                <React.Fragment>
                                    • {attachment.pages} Pages
                                </React.Fragment>
                            )}
                        </span>
                    </React.Fragment>
                </div>
            </div>
        </div>
    </React.Fragment>
}