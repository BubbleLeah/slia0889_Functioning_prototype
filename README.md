# slia0889_Functioning_prototype
## 1.How to interact with the work
After clicking "play/pause" with the mouse, the music will start playing. The content in the canvas changes size according to the rhythm of the music.
![](/assets/img1.jpg)

## 2.Details of my individual approach to animating the group code
I chose to use audio to drive my code. The animation part of this code changes the size of the shapes to the rhythm of the music.I was inspired by this sound interactive piece.
![](/assets/img2.jpg)
[Enfant Prodige](https://www.behance.net/gallery/87454449/Vector?tracking_source=search_projects|sound+interaction&l=6) is the new performance designed by Giuseppe Aceto (Call Me Vector) designer and artist based in Milan. The project stems from an exploration of the human-machine relationship / interaction and takes the form of a sound performance that integrate a real-time and interactive dialogue between dance, computer and artificial intelligence.

This work inspired me to use audio to create interactive effects. The content produced by our group is abstract lines. Abstract lines and animations that change with the music make a song concrete.

![](/assets/coding1.jpg)
1.fft.analyze() function is used to obtain the spectrum data of the current audio. The returned spectrum array contains the amplitudes of each band of the spectrum.

2.map(spectrum[10], 0, 255, 0.5, 2) maps the amplitude of the 10th frequency band in the spectrum array (ranging from 0 to 255) to between 0.5 and 2 to get sizeMultiplier. This means that changes in the spectrum will directly affect the value of sizeMultiplier.

![](/assets/coding2.jpg)
The sizeMultiplier variable is then used to control the size of each shape.And in the draw method of the DrawFunction class, the sizeMultiplier variable is passed to the configuration function config, thus affecting the drawing of each line.

![](/assets/coding3.jpg)
These code snippets ensure that the shape's width and height change dynamically based on the sizeMultiplier, allowing the shape to change size as the frequency spectrum of the music changes.