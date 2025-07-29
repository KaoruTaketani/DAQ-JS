## Graph
```mermaid
graph TD;
    eventBuffer-->channel0Evnet;
    eventBuffer-->channel1Evnet;
    channel0Evnet-->pairedEvent;
    channel1Evnet-->pairedEvent;
    pairedEvent-->neutronEvent;
    pairedEvent-->tofDifferenceHistogram;
    neutronEvent-->pulseHeightHistogram;
    neutronEvent-->rawImage;
    neutronEvent-->tofHistogram;
```