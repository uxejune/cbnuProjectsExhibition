(function goToRootIndex() {
    const path = `${window.location.pathname}`;
    const filePath = extractPathAfterDirectory(path, "digital_publishing/");
    const relativeReturnPath = createRelativeLink(filePath)

    console.log("path", extractPathAfterDirectory(path, "digital_publishing/"));
    console.log("relative return path:", relativeReturnPath)

    let timeoutId;
    
    // Set initial timeout when page loads
    timeoutId = setTimeout(() => {
        window.location.href = relativeReturnPath;
    }, 60000);

    // Reset timeout on mouse movement
    document.addEventListener('mousemove', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            window.location.href = relativeReturnPath;
        }, 60000);
    });

})();

function extractPathAfterDirectory(filePath, directory) {
    // 특정 디렉토리의 위치 찾기
    const directoryIndex = filePath.indexOf(directory);
    if (directoryIndex === -1) {
        // 디렉토리가 경로에 없을 경우 원본 경로 반환
        return filePath;
    }
    // 디렉토리 뒤의 부분만 남김
    return filePath.substring(directoryIndex + directory.length);
}

function createRelativeLink(filePath) {
    // 경로를 '/'로 분리
    const segments = filePath.split('/');

    // 파일 이름을 제외한 폴더 개수 계산 (마지막 요소가 파일이므로 제외)
    const folderCount = segments.length - 1;

    // "../"를 폴더 개수만큼 추가하고 index.html로 연결
    const relativeLink = '../'.repeat(folderCount) + 'index.html';

    return relativeLink;
}