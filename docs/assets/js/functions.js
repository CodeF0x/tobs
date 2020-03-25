document.addEventListener('DOMContentLoaded', async () => {
    const os = navigator.platform.startsWith('Win') ? 'Windows' : 'Mac';
    const { tag_name, assets } = await await (await fetch('https://api.github.com/repos/CodeF0x/tobs/releases/latest')).json();

    const latestVersion = document.getElementsByClassName('latest-version');

    for (const latest of latestVersion) {
        latest.innerText = tag_name;
    }

    const assetForPlatform = assets.filter(asset => {
        if (asset.name.includes(os.toLowerCase())) return true;
        else return false;
    });

    document.getElementById('download-link').href = assetForPlatform[0].browser_download_url;
    document.getElementById('client-os').innerText = os;
});