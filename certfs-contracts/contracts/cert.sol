// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract Certificates is ERC721Base {
    struct Certificate {
        address institution;
        string studentName;
        string studentEmail;
        string institutionName;
        string degree;
        string enrollmentId;
        string cidHash;
        string completionTime;
        bool issued;
        uint256 timestamp;
    }

    event CertificateIssued(
        uint256 certId,
        string studentEmail,
        address institution
    );

    mapping(uint256 => Certificate) certificates;
    mapping(uint256 => string) certificateEmail;
    mapping(string => uint256[]) certificateIdsByEmail;
    uint256 private tokenId;

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {
        tokenId = 1;
    }

    function issueCertificate(
        string memory studentName,
        string memory institutionName,
        string memory degree,
        string memory studentEmail,
        string memory enrollmentId,
        string memory cidHash,
        string memory completionTime
    ) external {
        _safeMint(msg.sender, tokenId);
        uint256 certId = tokenId;
        certificates[certId] = Certificate({
            institution: msg.sender,
            institutionName: institutionName,
            studentName: studentName,
            studentEmail: studentEmail,
            enrollmentId: enrollmentId,
            degree: degree,
            cidHash: cidHash,
            issued: true,
            completionTime: completionTime,
            timestamp: block.timestamp
        });
        certificateEmail[certId] = studentEmail;
        certificateIdsByEmail[studentEmail].push(certId);
        emit CertificateIssued(certId, studentEmail, msg.sender);
        tokenId++;
    }

    function getCertificateByStudentEmail(
        string memory studentEmail
    ) external view returns (Certificate[] memory) {
        uint256[] memory certIds = certificateIdsByEmail[studentEmail];
        Certificate[] memory result = new Certificate[](certIds.length);

        for (uint256 i = 0; i < certIds.length; i++) {
            uint256 certId = certIds[i];
            Certificate memory cert = certificates[certId];
            result[i] = cert;
        }
        return result;
    }
}
