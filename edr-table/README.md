## Graph
```mermaid
graph TD;
    eventBuffer-->channelEvnet;
    channelEvnet-->pairedEvent;
    pairedEvent-->neutronEvent;
    pairedEvent-->tofDifferenceHistogram;
    neutronEvent-->pulseHeightHistogram;
    neutronEvent-->rawImage;
    neutronEvent-->tofHistogram;
```