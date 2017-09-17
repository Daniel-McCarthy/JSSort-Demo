var paused = false;
var step = false;

var descendingTest = [];
var randomTest =
[0x9B, 0xB5, 0x2E, 0x70, 0xA1,
 0x3F, 0x5D, 0xEF, 0x45, 0x19,
 0x55, 0xB4, 0xC0, 0xE1, 0xE5,
 0x12, 0x28, 0x54, 0xA1, 0xCB,
 0x43, 0x0E, 0x76, 0xF5, 0x05,
 0xAD, 0x9A, 0x0C, 0x72, 0x9D,
 0x3F, 0xFA, 0x7A, 0xD1, 0x77,
 0x8C, 0xA5, 0x46, 0xFF, 0xA3,
 0x4B, 0xB2, 0xFC, 0xA5, 0xE7,
 0x0B, 0xD8, 0xD6, 0x9E, 0x6B,
 0x92, 0x90, 0x43, 0x17, 0xF8,
 0x33, 0xCC, 0xE6, 0xDB, 0x93,
 0xCB, 0xFB, 0xF1, 0x8C, 0x16,
 0x71, 0xEA, 0x81, 0x42, 0xB8,
 0x8E, 0xE5, 0x04, 0x94, 0xD7,
 0x5F, 0x23, 0x6C, 0x2E, 0x58, 
 0xDC, 0xDC, 0x05, 0x0C, 0x87,
 0x7B, 0x74, 0xE7, 0x76, 0x2F,
 0xAD, 0x1A, 0xDC, 0x06, 0xEE,
 0x82, 0xBB, 0xF3, 0xD5, 0xC9 ];
var gnomeData = [];
var selectionData = [];
var insertionData = [];
var bubbleData = [];




function initDescendingTest()
{
	for(var i = 0; i < 100; i++)
	{
		descendingTest[i] = 100 - i;
	}
}

function startSorts()
{
	if(!paused)
	{
		pauseSorts();
	}
	clearGraphs();
	initDescendingTest();
	gnomeData = descendingTest.slice();
	selectionData = descendingTest.slice();
	insertionData = descendingTest.slice();
	bubbleData = descendingTest.slice();
	
	//Init Gnome
	gnomeIndex = 0;
	
	//Init Selection
	closestValue = 0;
	closestIndex = 0;
	selectionIndex = 0;
	selectionSecondIndex = 0;
	selectionSwapNeeded = false;
	
	//Init Insertion
	insertionIndex = 1;
    insertionSecondIndex = 0;
    insertionSwapNeeded = false;
	insertionFirstRun = true;
	
	//Init Bucket
	bubbleIndex = 1;

	
	(paused)
	{
		pauseSorts();
	}
}

function clearGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	
	gnomeContext.fillStyle = "white";
	gnomeContext.fillRect(0, 0, 100, 256);
	
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");

	selectionContext.fillStyle = "white";
	selectionContext.fillRect(0, 0, 100, 256);
	
	var insertionContext = document.getElementById("insertionGraph").getContext("2d");

	insertionContext.fillStyle = "white";
	insertionContext.fillRect(0, 0, 100, 256);
	
	var bubbleContext = document.getElementById("bubbleGraph").getContext("2d");

	bubbleContext.fillStyle = "white";
	bubbleContext.fillRect(0, 0, 100, 256);
	
	
}

function updateGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");
	var insertionContext = document.getElementById("insertionGraph").getContext("2d");
	var bubbleContext = document.getElementById("bubbleGraph").getContext("2d");
	clearGraphs();
	
	for(var i = 0; i < gnomeData.length; i++)
	{
		gnomeContext.fillStyle = "black";
		gnomeContext.fillRect(i, (256)-gnomeData[i], 1, 1);
	}
	
	for(var i = 0; i < selectionData.length; i++)
	{
		selectionContext.fillStyle = "black";
		selectionContext.fillRect(i, (256)-selectionData[i], 1, 1);
	}
	
	for(var i = 0; i < insertionData.length; i++)
	{
		insertionContext.fillStyle = "black";
		insertionContext.fillRect(i, (256)-insertionData[i], 1, 1);
	}
	
	for(var i = 0; i < bubbleData.length; i++)
	{
		bubbleContext.fillStyle = "black";
		bubbleContext.fillRect(i, (256)-bubbleData[i], 1, 1);
	}
}

function sortStep()
{
	step = true;
}

function pauseSorts()
{
	paused = !paused;
	
	if(paused)
	{
		document.getElementById("pauseButton").value = "Resume";
	}
	else
	{
		document.getElementById("pauseButton").value = "Pause";
	}
}

var gnomeIndex = 0;

function gnomeStep()
{
	var c = 0;
	
	if((gnomeIndex == 0) || (gnomeData[gnomeIndex]) >= gnomeData[gnomeIndex - 1])
	{
		gnomeIndex++;
	}
	else
	{
		c = gnomeData[gnomeIndex];
		gnomeData[gnomeIndex] = gnomeData[gnomeIndex - 1];
		gnomeData[gnomeIndex - 1] = c;
		gnomeIndex--;
	}

}

var closestValue = 0;
var closestIndex = 0;
var selectionIndex = 0;
var selectionSecondIndex = 0;
var selectionSwapNeeded = false;

function selectionStep()
{
	var c = 0;
	
	if(selectionIndex == 0 && selectionSecondIndex == 0)
	{

		closestValue = selectionData[selectionIndex];
		closestIndex = selectionIndex;
	}
	
	if((selectionSecondIndex + 1) < selectionData.length)
	{
		if(selectionData[selectionSecondIndex] < closestValue)
		{
			closestValue = selectionData[selectionSecondIndex];
			closestIndex = selectionSecondIndex;
			selectionSwapNeeded = true;
		}
		selectionSecondIndex++;
	}
	else
	{
		if(selectionSwapNeeded)
		{
			c = selectionData[selectionIndex];
			selectionData[selectionIndex] = selectionData[closestIndex];
			selectionData[closestIndex] = c;
		}
		
		selectionSwapNeeded = false;
	
		selectionIndex++;
		selectionSecondIndex = selectionIndex + 1;
		
		closestValue = selectionData[selectionIndex];
		closestIndex = selectionIndex;

	}

	
}

var insertionIndex = 1;
var insertionSecondIndex = 0;
var insertionSwapNeeded = false;
var insertionFirstRun = true;

function insertionStep()
{
	var c = 0;
	
	if(insertionFirstRun)
	{
		insertionSwapNeeded = insertionData[insertionIndex] < insertionData[insertionIndex - 1];
		insertionSecondIndex = insertionIndex;
		insertionFirstRun = false;
	}
	
	if(insertionSwapNeeded)
	{
		c = insertionData[insertionSecondIndex - 1];
		insertionData[insertionSecondIndex - 1] = insertionData[insertionSecondIndex];
		insertionData[insertionSecondIndex] = c;
		
		insertionSecondIndex--;
		
		if(insertionSecondIndex > 0)
		{
			insertionSwapNeeded = insertionData[insertionSecondIndex] < insertionData[insertionSecondIndex - 1];
		}
		else
		{
			insertionSwapNeeded = false;
		}
	}
	else
	{
		insertionIndex++;
		insertionSwapNeeded = insertionData[insertionIndex] < insertionData[insertionIndex - 1];
		insertionSecondIndex = insertionIndex;
	}
}

var bubbleIndex = 1;

function bubbleStep()
{
	var c = 0;
	
	if (bubbleIndex >= bubbleData.length)
	{
		bubbleIndex = 1;
	}
	
	if(bubbleData[bubbleIndex - 1] > bubbleData[bubbleIndex])
	{
		c = bubbleData[bubbleIndex - 1];
		bubbleData[bubbleIndex - 1] = bubbleData[bubbleIndex];
		bubbleData[bubbleIndex] = c;
	}
	
	bubbleIndex++;
	
}

function sleep() {}

function isSorted(data)
{
	var sorted = true;
	for(var i = 1; i < data.length; i++)
	{
			if(data[i - 1] > data[i])
			{
				sorted = false;
			}
	}
	
	return sorted;
}

function startTimer()
{
	pauseSorts();
	
	clearGraphs();
	initDescendingTest();
	gnomeData = descendingTest.slice();
	selectionData = descendingTest.slice();
	insertionData = descendingTest.slice();
	bubbleData = descendingTest.slice();
	
	setInterval(stepAlgorithms, 1);
}

function stepAlgorithms()
{
	if(!paused || (paused && step))
	{
		if(!isSorted(gnomeData))
		{
			gnomeStep();
		}
		
		if(!isSorted(selectionData))
		{
			selectionStep();
		}
		
		if(!isSorted(insertionData))
		{
			insertionStep();
		}
		
		if(!isSorted(bubbleData))
		{
			bubbleStep();
		}

		
		updateGraphs();
		step = false;
	}
}
