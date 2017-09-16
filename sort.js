var paused = false;
var step = false;

var descendingTest = [];
var gnomeData = [];

var gnomeIndex = 0;

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

}

function updateGnomeGraph()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	clearGraphs();
	
	for(var i = 0; i < gnomeData.length; i++)
	{
		gnomeContext.fillStyle = "black";
		gnomeContext.fillRect(i, (256)-gnomeData[i], 1, 1);
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


function gnomeStep(data, i)
{
	var c = 0;
	
	if((i == 0) || (data[i]) >= data[i - 1])
	{
		i++;
	}
	else
	{
		c = data[i];
		data[i] = data[i - 1];
		data[i - 1] = c;
		i--;
	}
	
	return i;
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
	setInterval(stepAlgorithms, 1);
}

function stepAlgorithms()
{
	if(!paused || (paused && step))
	{
		if(!isSorted(gnomeData))
		{
			gnomeIndex = gnomeStep(gnomeData, gnomeIndex);
			updateGnomeGraph();
			step = false;
		}
	}
}
