# Quality Release Gate Demo

A small Node.js app that demonstrates how functional testing and
vulnerability scanning can support a release decision.

## How the workflow works

1. GitHub Actions builds the Docker image once.
2. Playwright runs a smoke test against the image.
3. Trivy scans the same image for high and critical vulnerabilities.
4. The demonstration release job runs only if both checks pass.

The release job simulates a release; it does not deploy the app.

## Run locally

You’ll need Node.js, Docker, and Trivy.

Build and start the app:

```bash
docker build -t quality-release-demo .
docker run --rm -d -p 3000:3000 --name quality-release-demo quality-release-demo
```

Open http://localhost:3000 to view the app.

Install the test dependencies and run Playwright:

```bash
npm ci
npx playwright install chromium
npx playwright test
```

### Install Trivy

On macOS with Homebrew:

```bash
brew install trivy
```

For other platforms, see the [official Trivy installation guide](https://trivy.dev/docs/latest/getting-started/installation/).

Scan the image:

```bash
trivy image --scanners vuln --severity HIGH,CRITICAL --exit-code 1 quality-release-demo
```

When finished, stop the container:

```bash
docker stop quality-release-demo
```

## Demonstrated results

### Before the npm update

Playwright passed, while Trivy reported 10 high-severity findings in
Node.js packages. The demonstration release job was skipped.

[View the blocked workflow run](https://github.com/nikch20/quality-release-gate-demo/actions/runs/43562147524)

### After the npm update

The image was rebuilt with npm 12.2.2. Playwright and Trivy passed,
and the demonstration release job succeeded.

[View the successful workflow run](https://github.com/nikch20/quality-release-gate-demo/actions/runs/43563095064)

Trivy results depend on the image and vulnerability database used at
scan time. The workflow saves the scan report as an Actions artifact.